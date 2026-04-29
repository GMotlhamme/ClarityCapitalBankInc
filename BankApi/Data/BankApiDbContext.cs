using BankApi.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace BankApi.Data
{
    public class BankApiDbContext : DbContext
    {
        public BankApiDbContext(DbContextOptions<BankApiDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Customer)
                .WithMany(c => c.Payments)
                .HasForeignKey(p => p.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Payment>()
                .HasOne(p => p.VerifiedByEmployee)
                .WithMany(e => e.VerifiedPayments)
                .HasForeignKey(p => p.VerifiedByEmployeeId)
                .OnDelete(DeleteBehavior.SetNull);
        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Employee> Employees { get; set; }
    }
}
