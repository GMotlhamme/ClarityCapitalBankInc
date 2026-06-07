using System.ComponentModel.DataAnnotations;

namespace BankApi.Models.DTO
{
    public class EmployeeLoginRequestDto
    {

        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(8)]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$", ErrorMessage = "Incorrect input ensure a minimum of 8 characters")]
        public string Password { get; set; } = string.Empty;
    }
}
