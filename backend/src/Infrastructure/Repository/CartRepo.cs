using backend.DTOs;
using backend.src.Entity;
using backend.src.Infrastructure.Interface;
using backendAPI;
using Microsoft.EntityFrameworkCore;

namespace backend.src.Infrastructure.Repository
{
    public class CartRepo : ICartRepo
    {
        private readonly DataContext _dbContext;
        private readonly ILogger<CartDbo> _logger;

        public CartRepo(DataContext dbContext, ILogger<CartDbo> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }
        public async Task<decimal> GetProductPriceAsync(int productId)
        {
            var product = await _dbContext.Set<ProductDbo>()
                .FirstOrDefaultAsync(p => p.Productid == productId);

            if (product == null)
                throw new Exception("Product not found");

            return product.Price;
        }

        public async Task AddCartAsync(CartDbo cart)
        {
            await _dbContext.Set<CartDbo>().AddAsync(cart);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<List<CartItemDto>> GetPendingCartItemsByUserIdAsync(int userId)
        {
            var cartItems = await (from cart in _dbContext.Cart
                                   join cartPayment in _dbContext.CartPayments on cart.Cart_id equals cartPayment.CartId into cartPayments
                                   from cp in cartPayments.DefaultIfEmpty()
                                   join payment in _dbContext.Payments on cp.BuyId equals payment.Buy_id into payments
                                   from p in payments.DefaultIfEmpty()
                                   join product in _dbContext.Products on cart.Product_id equals product.Productid
                                   where cart.User_id == userId
                                         && (p == null || p.Status != "complete") // เงื่อนไขไม่แสดงสินค้าที่มีสถานะเป็น "complete"
                                   select new CartItemDto
                                   {
                                       CartId = cart.Cart_id,
                                       ProductId = product.Productid,
                                       ProductName = product.Productname,
                                       Quantity = cart.Quantity,
                                       TotalPrice = cart.Total_price,
                                       ProductImgPath= product.Product_img
                                   }).ToListAsync();

            return cartItems;
        }
        public async Task<bool> RemoveCartItemAsync(int cartId)
        {
            var cartItem = await _dbContext.Cart.FindAsync(cartId);
            if (cartItem != null)
            {
                _dbContext.Cart.Remove(cartItem);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
