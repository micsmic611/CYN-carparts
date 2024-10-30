using backend.DTOs;

namespace backend.src.Core.Interface
{
    public interface ICartService 
    {
        Task AddCartAsync(AddCartDto cartDto);
        Task<List<CartItemDto>> GetCartItemsAsync(int userId);
        Task<bool> RemoveCartItemAsync(int cartId);
    }
}
