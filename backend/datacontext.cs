using Microsoft.EntityFrameworkCore;
using backend.src.Entities;

namespace backendAPI
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        // Add configuration for other entities here

        public DbSet<UserDbo> User { get; set; }
        
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Define configuration for number1Dbo if necessary
            //modelBuilder.Entity<number1Dbo>().ToTable("number1");
        }
    }
}