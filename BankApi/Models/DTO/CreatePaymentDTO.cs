using System.ComponentModel.DataAnnotations;

namespace BankApi.Models.DTO
{
    public class CreatePaymentDTO
    {
        
        [Required]
        [Range(1, 1000000)]
        public decimal Amount { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z]{3}$")] 
        public string Currency { get; set; }

        [Required]
        [StringLength(34)]
        public string PayeeAccountNumber { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z0-9]{8,11}$")] // SWIFT format
        public string SwiftCode { get; set; }
        
    }
}
