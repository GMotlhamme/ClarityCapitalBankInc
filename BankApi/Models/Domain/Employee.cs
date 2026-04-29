using System.ComponentModel.DataAnnotations;

namespace BankApi.Models.Domain
{
    public class Employee
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public List<Payment> VerifiedPayments { get; set; }
    }
}
