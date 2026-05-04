using BankApi.Data;
using BankApi.Models.Domain;
using BankApi.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BankApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Customer")]
    public class CustomerController : ControllerBase
    {
        private readonly BankApiDbContext _context;

        public CustomerController(BankApiDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("me")]

        public async Task<IActionResult> UserTransactions() 
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            //LINQ get all this users payments
            var userPaymentHistory = await _context.Payments
                                    .Where(p => p.CustomerId == userId)
                                    .ToListAsync();

            if (userPaymentHistory.Count == 0)
            {
                return NotFound("No transactions found");
            }

            var response = userPaymentHistory.Select(p => new PaymentResponseDTO
            {
                Id = p.Id,
                Amount = p.Amount,
                Currency = p.Currency,
                SwiftCode = p.SwiftCode,
                CreatedAt = p.CreatedAt,
                IsVerified = p.IsVerified,
                BeneficiaryName = p.BeneficiaryName
            });

            return Ok(response);

        }

        [HttpPost]
        [Route("me")]
        public async Task<IActionResult> NewPayment([FromBody] CreatePaymentDTO dTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            //find user id from token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null) 
            { 
            return Unauthorized("No token");
            }

            var paymentModel = new Payment
            {
                Amount = dTO.Amount,
                Currency = dTO.Currency,
                SwiftCode = dTO.SwiftCode,
                PayeeAccountNumber = dTO.PayeeAccountNumber,
                CustomerId = userId,
                BeneficiaryName = dTO.BeneficiaryName
            };

            await _context.Payments.AddAsync(paymentModel);
            await _context.SaveChangesAsync();

            return Ok("Your payment is being processed");

        }
    }
}
