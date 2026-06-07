using BankApi.Models.Domain;

namespace BankApi.Tests;

public class PaymentTests
{
    [Fact]
    public void Payment_Should_Be_Created_With_Default_Status_Pending()
    {
        // Arrange
        var payment = new Payment
        {
            Amount = 100,
            Currency = "USD",
            BeneficiaryName = "Test User",
            SwiftCode = "ABC123",
            PayeeAccountNumber = "12345678",
            CustomerId = "customer-1"
        };

        // Act
        var status = payment.Status;

        // Assert
        Assert.Equal("Pending", status);
    }

    [Fact]
    public void Payment_Should_Not_Be_Verified_By_Default()
    {
        var payment = new Payment();

        Assert.Null(payment.VerifiedByEmployeeId);
    }

}
