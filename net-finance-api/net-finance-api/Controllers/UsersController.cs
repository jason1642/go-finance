using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using NetFinanceApi.Services;
using net_finance_api.Models;
using BCrypt;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;




namespace net_finance_api.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly UsersService _usersService;


        public UsersController(IConfiguration config, UsersService usersService)
        {
            _configuration = config;
            _usersService = usersService;

        
        }

        // GET: api/users
        [HttpGet]
        public async Task<List<Users>> Get() =>
            await _usersService.GetAsync();



        // GET: api/users/5
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Users>> Get(string id)
        {
            var user = await _usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[AutoValidateAntiforgeryToken]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(string id, Users updatedUser)
        {
            var user = await _usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            updatedUser._id = user._id;

            await _usersService.UpdateAsync(id, updatedUser);

            return NoContent();
        }

        // POST: api/users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> Post(Users newUser)
        {
            newUser.password = BCrypt.Net.BCrypt.HashPassword(newUser.password, 12);
            await _usersService.CreateAsync(newUser);

            return CreatedAtAction(nameof(Get), newUser);
        }

        // DELETE: api/users/5
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            await _usersService.RemoveAsync(id);

            return NoContent();
        }

        // Post: api/Users/login
        [HttpPost("login")]
        public async Task<IActionResult?> Login([FromBody] Users userSignin)
        {




            if (ModelState.IsValid)
            {
                var user = await _usersService.Login(userSignin);

                if (user != null)
                {
                    

                    Claim[] claims = new[] {
                                            new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                                            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                                            new Claim("UserId", user._id.ToString()),
                                            new Claim("Username", user.username)
                                            //new Claim("Email", user.Email)
                                        };



                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                              _configuration["Jwt:Issuer"],
                              _configuration["Jwt:Audience"],
                              claims,
                              expires: DateTime.UtcNow.AddMinutes(10),
                              signingCredentials: signIn).ToString();

                    string RefreshToken = Guid.NewGuid().ToString();


                    //await _usersService.

                    Response.Cookies.Append("X-Access-Token", token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                    Response.Cookies.Append("X-Username", user.username, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
                    Response.Cookies.Append("X-Refresh-Token", RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

                    return Ok(RefreshToken);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
                return BadRequest(ModelState);

























            //Users? loginResponse = await _usersService.Login(user);
            //if (loginResponse == null) return BadRequest(new { message = "Invalid Username or Password" });
            ////Claim [] claims;

            // Claim [] claims = new[] {
            //                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
            //                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            //                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
            //                        new Claim("UserId", loginResponse._id.ToString()),
            //                        new Claim("Username", loginResponse.username)
            //                        //new Claim("Email", user.Email)
            //                    };



            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            //var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //var token = new JwtSecurityToken(
            //          _configuration["Jwt:Issuer"],
            //          _configuration["Jwt:Audience"],
            //          claims,
            //          expires: DateTime.UtcNow.AddMinutes(10),
            //          signingCredentials: signIn);

            //var RefreshToken = Guid.NewGuid().ToString();

            //Response.Cookies.Append("X-Access-Token", token.ToString(), new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            //Response.Cookies.Append("X-Username", user.username, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            //Response.Cookies.Append("X-Refresh-Token", RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            ////return loginResponse ?? null;
            //return loginResponse != null ? Ok(new JwtSecurityTokenHandler().WriteToken(token)) : BadRequest(new { message = "Invalid Username or Password"}) ;

















        }











        //private bool UsersExists(long id)
        //{
        //    return (_usersService.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}
