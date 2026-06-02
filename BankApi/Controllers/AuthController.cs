using BankApi.Data;
using BankApi.Interfaces;
using BankApi.Models.Domain;
using BankApi.Models.DTO;
using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;

        public AuthController(UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisteringDTO registeringDTO)
        {

            try
            {

                if (!ModelState.IsValid)
                {
                return BadRequest(ModelState);
                }

                var existingUser = await _userManager.FindByEmailAsync(registeringDTO.Email);

                if(existingUser != null)
                {
                    return BadRequest("This email is already registered. Please log in");
                }

                var user = new AppUser
                {
                    FullName = registeringDTO.FullName,
                    UserName = registeringDTO.Username,
                    IdNumber = registeringDTO.IdNumber,
                    AccountNumber = registeringDTO.AccountNumber,
                    Email = registeringDTO.Email
                };

                //hashing and salting the password using bcrypt
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword($"{registeringDTO.Password}");

                //saving changes to database
                 var result = await _userManager.CreateAsync(user);

                    if (!result.Succeeded)
                    {
                        return BadRequest(result.Errors);
                    }


                    // Assign role
                    await _userManager.AddToRoleAsync(user, "Customer");

                return Ok("user created");
            }
            catch(Exception ex) 
            {
                    return StatusCode(500, ex);
            }
        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginCustomerRequestDTO dTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var user = await _userManager.FindByEmailAsync(dTO.Email);


            if (user == null) 
            {
                return Unauthorized("Invalid credentials");
            }


            var verifiedPassword = BCrypt.Net.BCrypt.Verify(dTO.Password, user.PasswordHash);
                

            //if the password is wrong then we cut the function using this conditional
            if (!verifiedPassword)
            {
                return Unauthorized("Invalid credentials");
            }


            return Ok(new LoginCustomerResponseDTO
            {
                Username = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            });
            

        }
        [HttpPost]
        [Route("EmployeeLogin")]
        public async Task<IActionResult> EmployeeLogin([FromBody] EmployeeLoginDTO dto)
        {
            var user =
                await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
            {
                return Unauthorized();
            }

            var validPassword =
                BCrypt.Net.BCrypt.Verify(
                    dto.Password,
                    user.PasswordHash);

            if (!validPassword)
            {
                return Unauthorized();
            }

            var roles =
                await _userManager.GetRolesAsync(user);

            if (!roles.Contains("Employee"))
            {
                return Unauthorized(
                    "Not an employee"
                );
            }

            return Ok(new
            {
                token = await _tokenService.CreateToken(user)
            });
        }

    }
}
