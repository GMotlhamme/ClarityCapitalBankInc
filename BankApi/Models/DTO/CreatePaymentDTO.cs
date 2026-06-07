using System.ComponentModel.DataAnnotations;

namespace BankApi.Models.DTO
{
    public class CreatePaymentDto
    {
        
        [Required]
        [Range(1, 1000000)]
        public decimal Amount { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z]{3}$")] 
        public string Currency { get; set; } = string.Empty;

        [Required]
        [StringLength(34)]
        public string PayeeAccountNumber { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Only letters allowed")]
        public string BeneficiaryName { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^[A-Z0-9]{8,11}$")] // SWIFT format
        public string SwiftCode { get; set; } = string.Empty;

    }
}
