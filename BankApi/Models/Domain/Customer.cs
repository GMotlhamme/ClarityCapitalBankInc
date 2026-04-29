namespace BankApi.Models.Domain
{
    public class Customer
    {
        public Guid Id { get; set; }

        public string FullName { get; set; }

        public string Username { get; set; }

        public string AccountNumber { get; set; }

        public string IdNumber { get; set; } 

        public string Password { get; set; }

        //Many payments may belong to one customer
        public List<Payment> Payments { get; set; }
    }
}
