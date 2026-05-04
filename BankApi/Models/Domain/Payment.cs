using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankApi.Models.Domain
{
    public class Payment
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "decimal(18, 6)")]
        public decimal Amount { get; set; }

        public string Currency { get; set; }

        public string Provider { get; set; } = "SWIFT";

        public string PayeeAccountNumber { get; set; } 

        public string SwiftCode { get; set; }

        public string BeneficiaryName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public bool? IsVerified { get; set; }

        //Employee relationship
        public string? VerifiedByEmployeeId { get; set; }

        [ForeignKey("VerifiedByEmployeeId")]
        public AppUser? VerifiedByEmployee { get; set; }

        public DateTime? VerifiedAt { get; set; }

        //Customer Relationship
        public string CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public AppUser Customer { get; set; }
    }
}
