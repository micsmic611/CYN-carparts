using backend.src.Entity;
using backend.src.Infrastructure.Interface;
using backend.src.Core.Interface;
using Microsoft.EntityFrameworkCore;
using backendAPI;
using backend.DTOs;
namespace backend.src.Core.Service
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly DataContext _dataContext;

        public PaymentService(IPaymentRepository paymentRepository,DataContext dataContext)
        {
            _paymentRepository = paymentRepository;
            _dataContext = dataContext;
        }
        public async Task<PaymentDbo> AddPaymentAsync(int userId, int[] cartIds, int locationId, int shippingId)
        {
            // คำนวณ total_price
            var totalPrice = await _paymentRepository.GetTotalPriceAsync(cartIds);

            var payment = new PaymentDbo
            {
                User_id = userId,
                Total_price = totalPrice,
                Location_id = locationId,
                Status = "pending",
                shipping_id = shippingId,
                CartPayments = new List<CartPaymentDbo>() // สร้าง collection สำหรับ CartPayments
            };

            // บันทึกการชำระเงิน
            var createdPayment = await _paymentRepository.AddPaymentAsync(payment);

            // บันทึก CartPayment สำหรับแต่ละ cart_id
            foreach (var cartId in cartIds)
            {
                // ตรวจสอบว่ามี cart_id อยู่ในตาราง Cart หรือไม่
                var cartItem = await _dataContext.Cart.FindAsync(cartId);
                if (cartItem == null)
                {
                    throw new Exception($"Cart with ID {cartId} does not exist.");
                }

                // ตรวจสอบว่ามีผลิตภัณฑ์ที่เกี่ยวข้องกับ cart_id
                // ใช้ Product_id จาก cartItem เพื่อเข้าถึง Product
                var productId = cartItem.Product_id; // ตรวจสอบว่าเป็น nullable หรือไม่
                if (!productId.HasValue) // ตรวจสอบว่ามีค่าหรือไม่
                {
                    throw new Exception($"Product with ID {cartItem.Product_id} does not exist.");
                }

                // ตรวจสอบการมีอยู่ของผลิตภัณฑ์
                var productExists = await _dataContext.Products.AnyAsync(p => p.Productid == productId.Value);
                if (!productExists)
                {
                    throw new Exception($"Product with ID {productId.Value} does not exist.");
                }

                // สร้าง CartPaymentDbo และเพิ่มเข้าไปใน Collection
                var cartPayment = new CartPaymentDbo
                {
                    BuyId = createdPayment.Buy_id,
                    CartId = cartId, // ควรเป็น ID ของตะกร้าสินค้า
                    ProductId = productId.Value, // ใช้ค่าจริงจาก Product_id
                    PaymentBuyId = createdPayment.Buy_id
                };

                payment.CartPayments.Add(cartPayment);
            }

            // บันทึก CartPayments ลงในฐานข้อมูล
            await _dataContext.CartPayments.AddRangeAsync(payment.CartPayments);
            await _dataContext.SaveChangesAsync();

            return createdPayment; // ส่งคืนการชำระเงินที่สร้างขึ้น
        }


        public async Task<PaymentDbo?> GetPaymentByIdAsync(int id)
        {
            return await _paymentRepository.GetPaymentByIdAsync(id);
        }
        public async Task UpdatePaymentAndSendAsync(int buyId, int userId)
        {
            // ค้นหาบันทึกการชำระเงินที่ต้องการอัปเดต
            var payment = await _dataContext.Payments
                .Include(p => p.CartPayments)
                .FirstOrDefaultAsync(p => p.Buy_id == buyId);

            if (payment == null)
            {
                throw new Exception("Payment not found.");
            }

            // อัปเดตสถานะการชำระเงิน
            payment.Status = "complete";
            _dataContext.Payments.Update(payment);

            // ลด stock ใน Product ตาม quantity ใน Cart
            foreach (var cartPayment in payment.CartPayments)
            {
                var cart = await _dataContext.Cart.FindAsync(cartPayment.CartId);
                if (cart != null)
                {
                    var product = await _dataContext.Products.FindAsync(cart.Product_id);
                    if (product != null)
                    {
                        product.Stock -= cart.Quantity; // ลด stock
                        _dataContext.Products.Update(product);
                    }
                }
            }

            // เพิ่มข้อมูลใน Send
            var send = new SendDbo
            {
                Buy_id = buyId,
                Send_status = "Waiting for delivery",
                TrackNum = null,
                User_id = userId // กรอก user_id
            };
            await _dataContext.Send.AddAsync(send);

            // บันทึกการเปลี่ยนแปลงทั้งหมดในฐานข้อมูล
            await _dataContext.SaveChangesAsync();
        }
        public async Task<List<PaymentHistoryDto>> GetPaymentHistoryAsync(int userId)
        {
            return await _paymentRepository.GetPaymentHistoryByUserIdAsync(userId);
        }
        public async Task<List<PaymentHistoryDto>> GetAllPaymentHistoryAsync()
        {
            var paymentHistory = await (from p in _dataContext.Payments
                                        join cp in _dataContext.CartPayments on p.Buy_id equals cp.BuyId into cpGroup
                                        from cp in cpGroup.DefaultIfEmpty()
                                        join c in _dataContext.Cart on cp.CartId equals c.Cart_id into cGroup
                                        from c in cGroup.DefaultIfEmpty()
                                        join pr in _dataContext.Products on c.Product_id equals pr.Productid into prGroup
                                        from pr in prGroup.DefaultIfEmpty()
                                        join s in _dataContext.Send on p.Buy_id equals s.Buy_id into sGroup
                                        from s in sGroup.DefaultIfEmpty()
                                        where p.Status == "complete"
                                        select new PaymentHistoryDto
                                        {
                                            BuyId = p.Buy_id,
                                            ProductName = (pr != null) ? pr.Productname : "Unknown",
                                            Quantity = (c != null) ? c.Quantity : 0,
                                            TotalPrice = (c != null) ? c.Total_price : 0,
                                            PaymentStatus = p.Status,
                                            PurchaseDate = p.Created_at,
                                            send_status = s.Send_status
                                        }).ToListAsync();

            return paymentHistory;
        }
    }
}
