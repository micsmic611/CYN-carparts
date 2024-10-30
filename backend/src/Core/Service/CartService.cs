using backend.DTOs;
using backend.src.Core.Interface;
using backend.src.Infrastructure.Interface;

namespace backend.src.Core.Service
{
    public class CartService : ICartService
    {
        private readonly ICartRepo _cartRepository;
        public CartService(ICartRepo cartRepository)
        {
            _cartRepository = cartRepository;
        }
        public async Task AddCartAsync(AddCartDto cartDto)
        {
            // ดึงราคาสินค้าจาก Product ตาม productId
            decimal productPrice = await _cartRepository.GetProductPriceAsync(cartDto.ProductId);

            // คำนวณ total_price = product_price * quantity
            decimal totalPrice = productPrice * cartDto.Quantity;

            // สร้าง Cart Object
            var cart = new Entity.CartDbo
            {
                User_id = cartDto.UserId,
                Product_id = cartDto.ProductId,
                Quantity = cartDto.Quantity,
                Total_price = totalPrice
            };

            // บันทึกลงฐานข้อมูล
            await _cartRepository.AddCartAsync(cart);
        }
        public async Task<List<CartItemDto>> GetCartItemsAsync(int userId)
        {
            return await _cartRepository.GetPendingCartItemsByUserIdAsync(userId);
        }
        public async Task<bool> RemoveCartItemAsync(int cartId)
        {
            return await _cartRepository.RemoveCartItemAsync(cartId);
        }
    }
}
