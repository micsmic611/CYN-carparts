using backend.DTOs;

namespace backend.src.Core.Interface
{
    public interface ICartService 
    {
        Task AddCartAsync(AddCartDto cartDto);
    }
}
