using BankApi.Data;
using BankApi.Models.Domain;
using BankApi.Models.DTO;
using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BankApiDbContext _bankApiDbContext;

        public AuthController(BankApiDbContext bankApiDbContext){
            _bankApiDbContext = bankApiDbContext;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisteringDTO registeringDTO)
        {
            if (ModelState.IsValid)
            {

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword($"{registeringDTO.Password}");

            var registerCustomerDomainModel = new Customer
            {
                FullName = registeringDTO.FullName,
                Username = registeringDTO.Username,
                IdNumber = registeringDTO.IdNumber,
                AccountNumber = registeringDTO.AccountNumber,
                Password = hashedPassword
            };

            await _bankApiDbContext.Customers.AddAsync(registerCustomerDomainModel);
            await _bankApiDbContext.SaveChangesAsync();

            return Ok("user created");
            }
            return BadRequest(ModelState);
        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginCustomerRequestDTO dTO)
        {
            if (ModelState.IsValid)
            {
                var validUser = await _bankApiDbContext.Customers.FirstOrDefaultAsync(x => x.IdNumber == dTO.IdNumber);

                
                if (validUser != null) {

                    var verifiedPassword = BCrypt.Net.BCrypt.Verify(dTO.Password, validUser.Password);


                    return Ok($"made it to this point {verifiedPassword}");







                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            return BadRequest(ModelState);
        }

    }
}
