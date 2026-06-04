using BankApi.Data;
using BankApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly BankApiDbContext _context;

    public EmployeeController(
        BankApiDbContext context)
    {
        _context = context;
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
        VerifyPaymentDTO dto)
    {
        var payment =
            await _context.Payments
                .FirstOrDefaultAsync(x => x.Id == dto.PaymentId);

        if (payment == null)
            return NotFound();

        payment.Status =
            dto.Approved
            ? "Approved"
            : "Rejected";

        await _context.SaveChangesAsync();

        return Ok();
    }
}

