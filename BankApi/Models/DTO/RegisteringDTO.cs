using System.ComponentModel.DataAnnotations;

namespace BankApi.Models.DTO
{
    public class RegisteringDTO
    {
        [Required]
        [StringLength(100)]
        [RegularExpression(@"^[a-zA-Z\s]+$")]
        public string FullName { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(20)]
        public string AccountNumber { get; set; }

        [Required]
        [RegularExpression(@"^\d{13}$")]
        public string IdNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "must at least be 8 characters long")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$", ErrorMessage = "Must contain at least one uppercase, lowercase, number and special character")]
        public string Password { get; set; }
    }
}
