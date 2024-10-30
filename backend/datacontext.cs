using Microsoft.EntityFrameworkCore;
using backend.src.Entities;
using backend.src.Entity;

namespace backendAPI
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        // Add configuration for other entities here

        public DbSet<UserDbo> User { get; set; }
        public DbSet<ShippingDbo> Shipping { get; set; }
        public DbSet<ProductDbo> Products { get; set; }
        public DbSet<PaymentDbo> Payments { get; set; }
        public DbSet<CategorieDbo> Categories { get; set; }
        public DbSet<LocationDbo> Location { get; set; }
        public DbSet<RoleDbo> Role { get; set; }
        public DbSet<SendDbo> Send { get; set; }
        public DbSet<CartDbo> Cart { get; set; }
        public DbSet<CartPaymentDbo> CartPayments { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Define configuration for number1Dbo if necessary
            //modelBuilder.Entity<number1Dbo>().ToTable("number1");
        }
    }
}