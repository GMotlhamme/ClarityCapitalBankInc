using BankApi.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BankApi.Data
{
    public class BankApiDbContext : IdentityDbContext<AppUser>
    {
        public BankApiDbContext(DbContextOptions<BankApiDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //specifying relationships between tables
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Customer)
                .WithMany(c => c.Payments)
                .HasForeignKey(p => p.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Payment>()
                .HasOne(p => p.VerifiedByEmployee)
                .WithMany(e => e.VerifiedPayments)
                .HasForeignKey(p => p.VerifiedByEmployeeId)
                .OnDelete(DeleteBehavior.SetNull);

        }
        public DbSet<Payment> Payments { get; set; }
    }
}
