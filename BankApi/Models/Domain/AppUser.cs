using Microsoft.AspNetCore.Identity;

namespace BankApi.Models.Domain
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }

        public string AccountNumber { get; set; }

        public string IdNumber { get; set; }
        

        //Navigation property
        public List<Payment> Payments { get; set; }

        public List<Payment> VerifiedPayments { get; set; }
    }
}
