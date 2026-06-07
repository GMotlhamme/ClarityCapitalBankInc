namespace BankApi.Models.DTO
{
    public class PaymentResponseDto
    {
        
        public Guid Id { get; set; }

        public decimal Amount { get; set; }

        public string Currency { get; set; } = string.Empty;

        public string SwiftCode { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public string? Status { get; set; }

        public string BeneficiaryName { get; set; } = string.Empty;
    }
}
