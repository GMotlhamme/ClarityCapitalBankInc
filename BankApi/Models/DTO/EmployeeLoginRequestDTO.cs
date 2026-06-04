using System.ComponentModel.DataAnnotations;

namespace BankApi.Models.DTO
{
    public class EmployeeLoginRequestDTO
    {
        

        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Only letters allowed in usernames")]
        public string Username { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$", ErrorMessage = "Incorrect input ensure a minimum of 8 characters")]
        public string Password { get; set; }
    }
}
