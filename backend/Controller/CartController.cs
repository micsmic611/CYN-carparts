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
    }
}
