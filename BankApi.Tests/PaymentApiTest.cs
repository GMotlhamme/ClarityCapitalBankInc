using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.Web.CodeGeneration.Design;
using System.Net;
using System.Net.Http.Json;
using Xunit;

namespace BankApi.Tests;

public class PaymentApiTest : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public PaymentApiTest(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetPayments_Should_Return_Unauthorized_Without_Token()
    {
        var response = await _client.GetAsync("/api/Employee/AllPayments");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
}
