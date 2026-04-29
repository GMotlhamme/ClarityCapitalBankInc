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

        public DateTime CreatedAt { get; set; }

        public bool? IsVerified { get; set; }

        //Which employee verified this transaction
        public Guid? VerifiedByEmployeeId { get; set; }

        [ForeignKey("VerifiedByEmployeeId")]
        public Employee VerifiedByEmployee { get; set; }

        public DateTime? VerifiedAt { get; set; }

        //which customer made this transaction
        public Guid CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }
    }
}
