using System.ComponentModel.DataAnnotations;

namespace BankApi.Models.DTO
{
    public class LoginCustomerRequestDto
    {
        public string? FullName { get; set; }
        
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Only letters allowed")]
        public string Username { get; set; } = string.Empty;

        [RegularExpression(@"^\d{10,12}$", ErrorMessage = "Invalid account number ensure the length of 10-12 characters")]
        public string AccountNumber { get; set; } = string.Empty;

        public string? IdNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(8)]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$", ErrorMessage = "Incorrect input")]
        public string Password { get; set; } = string.Empty;
    }
}
