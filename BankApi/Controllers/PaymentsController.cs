using BankApi.Data;
using BankApi.Models.Domain;
using BankApi.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BankApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Employee")]
    public class PaymentsController : ControllerBase
    {
        private readonly BankApiDbContext _context;

        public PaymentsController(BankApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Payments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            return await _context.Payments.ToListAsync();
        }

        // GET: api/Payments/5
        [HttpGet("{PaymentID}")]
        public async Task<ActionResult<GetSinglePaymentResponseDTO>> GetPayment(Guid PaymentID)
        {

            var payment = await _context.Payments
                                    .Include(p => p.Customer)
                                    .Include(p => p.VerifiedByEmployee)
                                    .FirstOrDefaultAsync(p => p.Id == PaymentID);

            if (payment == null)
            {
                return NotFound();
            }

            var response = new GetSinglePaymentResponseDTO
            {
                Id = payment.Id,
                Amount = payment.Amount,
                Currency = payment.Currency,
                SwiftCode = payment.SwiftCode,
                CreatedAt = payment.CreatedAt,
                IsVerified = payment.IsVerified,
                BeneficiaryName = payment.BeneficiaryName,
                CustomerName = payment.Customer.FullName,
                CustomerEmail = payment.Customer.Email ?? "no email",
                VerifiedAt = payment.VerifiedAt,
                VerifiedBy = payment.VerifiedByEmployeeId ?? "not verified yet"
            };

            return Ok(response);
        }

        // PUT: api/Payments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayment(Guid id, Payment payment)
        {
            if (id != payment.Id)
            {
                return BadRequest();
            }

            _context.Entry(payment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        

        // DELETE: api/Payments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(Guid id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentExists(Guid id)
        {
            return _context.Payments.Any(e => e.Id == id);
        }
    }
}
