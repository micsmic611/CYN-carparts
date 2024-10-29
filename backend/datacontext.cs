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
        public DbSet<Shipping> Shipping { get; set; }
        public DbSet<Products> Product { get; set; }
        public DbSet<Payments> Payments { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Order_Items> Order_Items { get; set; }
        public DbSet<Categories> Categories { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Define configuration for number1Dbo if necessary
            //modelBuilder.Entity<number1Dbo>().ToTable("number1");
        }
    }
}