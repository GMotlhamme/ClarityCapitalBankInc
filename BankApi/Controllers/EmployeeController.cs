using BankApi.Data;
using BankApi.Models.Domain;
using BankApi.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BankApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Employee")]
public class EmployeeController : ControllerBase
{
    private readonly BankApiDbContext _context;

    public EmployeeController(BankApiDbContext context)
    {
        _context = context;
    }
    
    [HttpGet("AllPayments")]
    public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
    {
        return await _context.Payments.ToListAsync();
    }

    [HttpGet("PendingPayments")]
    public async Task<IActionResult> GetPendingPayments()
    {
        var payments =
            await _context.Payments
                .Where(p => p.Status == "Pending")
                .ToListAsync();

        return Ok(payments);
    }

    [HttpPut("VerifyPayment")]
    public async Task<IActionResult> VerifyPayment(
        VerifyPaymentDto dto)
    {
        //find user id from token
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
        {
            return Unauthorized("No token");
        }

        var payment = await _context.Payments.FirstOrDefaultAsync(x => x.Id == dto.PaymentId);

        if (payment == null)
        {
            return NotFound("Payment does not exist");
        }

        if(payment.Status != "Pending")
        {
            return BadRequest("Payment has already been reviewed");
        }

        payment.Status = dto.Approved ? "Approved" : "Rejected";

        await _context.SaveChangesAsync();

        return Ok("Payment Reviewed");
    }
}

