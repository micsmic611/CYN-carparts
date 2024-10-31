using backend.DTOs;
using backend.src.Entity;
using backend.src.Infrastructure.Interface;
using backendAPI;
using Microsoft.EntityFrameworkCore;
namespace backend.src.Infrastructure.Repository
{
   

    public class PaymentRepository : IPaymentRepository
    {
        private readonly DataContext _context;

        public PaymentRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PaymentDbo> AddPaymentAsync(PaymentDbo payment)
        {
            await _context.Payments.AddAsync(payment);
            await _context.SaveChangesAsync();
            return payment;
        }
        public async Task SaveCartPaymentsAsync(IEnumerable<CartPaymentDbo> cartPayments)
        {
            await _context.CartPayments.AddRangeAsync(cartPayments);
            await _context.SaveChangesAsync();
        }
        public async Task<PaymentDbo?> GetPaymentByIdAsync(int id)
        {
            return await _context.Payments
                .FirstOrDefaultAsync(payment => payment.Buy_id == id); // ค้นหาตาม buy_id
        }
        public async Task<decimal> GetTotalPriceAsync(int[] cartIds)
        {
            return await _context.Cart
                .Where(cart => cartIds.Contains(cart.Cart_id))
                .SumAsync(cart => cart.Total_price);
        }
        public async Task<PaymentDbo> UpdatePaymentStatusAsync(int buyId)
        {
            var payment = await _context.Payments.FindAsync(buyId);
            if (payment != null)
            {
                payment.Status = "complete";
                await _context.SaveChangesAsync();
            }
            return payment;
        }

        public async Task AddSendRecordAsync(int buyId, int userId)
        {
            var sendRecord = new SendDbo
            {
                Buy_id = buyId,
                User_id = userId, // ตรวจสอบว่าได้กำหนดค่า userId หรือไม่
                Send_status = "Waiting for delivery",
                TrackNum = null
            };

            _context.Send.Add(sendRecord);
            await _context.SaveChangesAsync();
        }
        public async Task<List<PaymentHistoryDto>> GetPaymentHistoryByUserIdAsync(int userId)
        {
            var paymentHistory = await (from p in _context.Payments
                                        join cp in _context.CartPayments on p.Buy_id equals cp.BuyId into cpGroup
                                        from cp in cpGroup.DefaultIfEmpty()
                                        join c in _context.Cart on cp.CartId equals c.Cart_id into cGroup
                                        from c in cGroup.DefaultIfEmpty()
                                        join pr in _context.Products on c.Product_id equals pr.Productid into prGroup
                                        from pr in prGroup.DefaultIfEmpty()
                                        join s in _context.Send on p.Buy_id equals s.Buy_id into sGroup
                                        from s in sGroup.DefaultIfEmpty()
                                        where p.User_id == userId && p.Status == "complete"
                                        select new PaymentHistoryDto
                                        {
                                            BuyId = p.Buy_id,
                                            ProductName = (pr != null) ? pr.Productname : "Unknown", // ตรวจสอบ null
                                            Quantity = (c != null) ? c.Quantity : 0, // ตรวจสอบ null
                                            TotalPrice = (c != null) ? c.Total_price : 0, // ตรวจสอบ null
                                            PaymentStatus = p.Status,
                                            PurchaseDate = p.Created_at,
                                            send_status = s.Send_status
                                        }).ToListAsync();
            Console.WriteLine($"Payment History Count for userId {userId}: {paymentHistory.Count}");
            return paymentHistory;
        }
        public async Task<List<PaymentHistoryDto>> GetAllPaymentHistoryAsync()
        {
            var paymentHistory = await (from p in _context.Payments
                                        join cp in _context.CartPayments on p.Buy_id equals cp.BuyId into cpGroup
                                        from cp in cpGroup.DefaultIfEmpty()
                                        join c in _context.Cart on cp.CartId equals c.Cart_id into cGroup
                                        from c in cGroup.DefaultIfEmpty()
                                        join pr in _context.Products on c.Product_id equals pr.Productid into prGroup
                                        from pr in prGroup.DefaultIfEmpty()
                                        join s in _context.Send on p.Buy_id equals s.Buy_id into sGroup
                                        from s in sGroup.DefaultIfEmpty()
                                        where p.Status == "complete" // Removed userId filter
                                        select new PaymentHistoryDto
                                        {
                                            BuyId = p.Buy_id,
                                            ProductName = (pr != null) ? pr.Productname : "Unknown", // Check for null
                                            Quantity = (c != null) ? c.Quantity : 0, // Check for null
                                            TotalPrice = (c != null) ? c.Total_price : 0, // Check for null
                                            PaymentStatus = p.Status,
                                            PurchaseDate = p.Created_at,
                                            send_status = s.Send_status
                                        }).ToListAsync();

            Console.WriteLine($"Payment History Count: {paymentHistory.Count}");
            return paymentHistory;
        }

    }
}