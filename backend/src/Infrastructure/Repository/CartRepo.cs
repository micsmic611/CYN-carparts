using backend.src.Entity;
using backend.src.Infrastructure.Interface;
using backendAPI;
using Microsoft.EntityFrameworkCore;

namespace backend.src.Infrastructure.Repository
{
    public class CartRepo: ICartRepo
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
    }
}
