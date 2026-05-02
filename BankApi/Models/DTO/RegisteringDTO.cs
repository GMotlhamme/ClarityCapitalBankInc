using System.ComponentModel.DataAnnotations;

namespace BankApi.Models.DTO
{
    public class RegisteringDTO
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Only letters allowed")]
        public string FullName { get; set; }

        [Required]
        [RegularExpression(@"^\d{13}$", ErrorMessage = "ID must be 13 digits")]
        public string IdNumber { get; set; }

        [Required]
        [RegularExpression(@"^\d{10,12}$", ErrorMessage = "Invalid account number")]
        public string AccountNumber { get; set; }

        [Required]
        [EmailAddress]

        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{8,}$",
            ErrorMessage = "Password must be 8+ chars, include uppercase & number")]
        public string Password { get; set; }
    }
}
