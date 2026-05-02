using System.ComponentModel.DataAnnotations;

namespace BankApi.Models.DTO
{
    public class LoginCustomerRequestDTO
    {
        public string FullName { get; set; }

        public string Username { get; set; }

        public string AccountNumber { get; set; }

        public string IdNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$", ErrorMessage = "Incorrect input")]
        public string Password { get; set; }
    }
}
