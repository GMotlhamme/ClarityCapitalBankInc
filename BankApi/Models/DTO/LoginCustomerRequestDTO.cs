namespace BankApi.Models.DTO
{
    public class LoginCustomerRequestDTO
    {
        public string FullName { get; set; }

        public string Username { get; set; }

        public string AccountNumber { get; set; }

        public string IdNumber { get; set; }

        public string Password { get; set; }
    }
}
