namespace BankApi.Models.DTO
{
    public class VerifyPaymentDTO
    {
        public Guid PaymentId { get; set; }

        public bool Approved { get; set; }
    }
}
