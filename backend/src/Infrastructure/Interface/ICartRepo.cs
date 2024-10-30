using backend.src.Entity;

namespace backend.src.Infrastructure.Interface
{
    public interface ICartRepo
    {
        Task AddCartAsync(CartDbo cart);
        Task<decimal> GetProductPriceAsync(int productId);
    }
}
