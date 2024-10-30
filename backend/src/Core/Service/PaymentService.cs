using backend.src.Entity;
using backend.src.Infrastructure.Interface;
using backend.src.Core.Interface;
using Microsoft.EntityFrameworkCore;
using backendAPI;
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

            var createdPayment = await _paymentRepository.AddPaymentAsync(payment);

            // บันทึก CartPayment สำหรับแต่ละ cart_id
            foreach (var cartId in cartIds)
            {
                payment.CartPayments.Add(new CartPaymentDbo
                {
                    BuyId = createdPayment.Buy_id,
                    CartId = cartId
                });
            }

            await _paymentRepository.SaveCartPaymentsAsync(payment.CartPayments);

            return createdPayment;
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

    }
}
