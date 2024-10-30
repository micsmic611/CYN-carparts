using backend.DTOs;
using backend.src.Entity;

namespace backend.src.Infrastructure.Interface
{
    public interface IPaymentRepository
    {
        Task<PaymentDbo> AddPaymentAsync(PaymentDbo payment);
        Task<PaymentDbo?> GetPaymentByIdAsync(int id);
        Task SaveCartPaymentsAsync(IEnumerable<CartPaymentDbo> cartPayments);
        Task<decimal> GetTotalPriceAsync(int[] cartIds);
        Task<PaymentDbo> UpdatePaymentStatusAsync(int buyId);
        Task AddSendRecordAsync(int buyId, int userId);
        Task<List<PaymentHistoryDto>> GetPaymentHistoryByUserIdAsync(int userId);
    }
}
