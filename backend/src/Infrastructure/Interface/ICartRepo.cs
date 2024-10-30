using backend.DTOs;
using backend.src.Entity;

namespace backend.src.Infrastructure.Interface
{
    public interface ICartRepo
    {
        Task AddCartAsync(CartDbo cart);
        Task<decimal> GetProductPriceAsync(int productId);
        Task<List<CartItemDto>> GetPendingCartItemsByUserIdAsync(int userId);
        Task<bool> RemoveCartItemAsync(int cartId);
    }
}
