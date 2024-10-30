using backend.DTOs;
using backend.src.Core.Interface;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCart([FromBody] AddCartDto cartDto)
        {
            try
            {
                await _cartService.AddCartAsync(cartDto);
                return Ok(new { message = "Product added to cart successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCartItems(int userId)
        {
            var cartItems = await _cartService.GetCartItemsAsync(userId);
            if (cartItems == null || !cartItems.Any())
            {
                return NotFound("No items found in the cart.");
            }

            return Ok(cartItems);
        }
        [HttpDelete("{cartId}")]
        public async Task<IActionResult> RemoveCartItem(int cartId)
        {
            var result = await _cartService.RemoveCartItemAsync(cartId);
            if (result)
            {
                return NoContent(); // คืนค่า 204 No Content หากลบสำเร็จ
            }
            return NotFound("Cart item not found."); // คืนค่า 404 หากไม่พบสินค้าที่ต้องการลบ
        }

    }
}
