using backend.DTOs;
using backend.src.Entity;

namespace backend.src.Core.Interface
{
    public interface IPaymentService
    {
        Task<PaymentDbo> AddPaymentAsync(int userId, int[] cartIds, int locationId, int shippingId);
        Task<PaymentDbo?> GetPaymentByIdAsync(int id);

        Task UpdatePaymentAndSendAsync(int buyId, int userId);
        Task<List<PaymentHistoryDto>> GetPaymentHistoryAsync(int userId);
    }
}
