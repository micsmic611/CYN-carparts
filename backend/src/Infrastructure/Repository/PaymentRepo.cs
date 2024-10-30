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
    }
}
