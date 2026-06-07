namespace BankApi.Models.DTO
{
    public class VerifyPaymentDto
    {
        public Guid PaymentId { get; set; }
   
        public bool Approved { get; set; }
    }
}
