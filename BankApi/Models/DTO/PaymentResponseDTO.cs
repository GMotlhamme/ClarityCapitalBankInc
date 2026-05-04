namespace BankApi.Models.DTO
{
    public class PaymentResponseDTO
    {
        
        public Guid Id { get; set; }

        public decimal Amount { get; set; }

        public string Currency { get; set; }

        public string SwiftCode { get; set; }

        public DateTime CreatedAt { get; set; }

        public bool? IsVerified { get; set; }

        public string? BeneficiaryName { get; set; }
    }
}
