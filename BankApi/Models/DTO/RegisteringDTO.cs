using System.ComponentModel.DataAnnotations;

namespace BankApi.Models.DTO
{
    public class RegisteringDto
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Only letters allowed")]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Only letters allowed")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^\d{13}$", ErrorMessage = "ID must be 13 digits")]
        public string IdNumber { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^\d{10,12}$", ErrorMessage = "Invalid account number")]
        public string AccountNumber { get; set; } = string.Empty;

        [Required]
        [EmailAddress]

        public string Email { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{8,}$",
            ErrorMessage = "Password must be 8+ chars, include uppercase & number")]
        public string Password { get; set; } = string.Empty;
    }
}
