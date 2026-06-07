using Microsoft.AspNetCore.Identity;

namespace BankApi.Models.Domain
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; } = string.Empty;

        public string AccountNumber { get; set; } = string.Empty;

        public string IdNumber { get; set; } = string.Empty;


        //Navigation property
        public List<Payment>? Payments { get; set; }

        public List<Payment>? VerifiedPayments { get; set; }
    }
}
