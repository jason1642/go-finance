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
using MongoDB.Driver;
using Microsoft.EntityFrameworkCore.Metadata.Internal;




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
                    
                    user.refresh_token = RefreshToken;
                    await _usersService.UpdateAsync(user._id, user);
                 
                    Response.Cookies.Append("X-Access-Token", token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict, Domain = "localhost" });
                    Response.Cookies.Append("X-Username", user.username, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict, Domain = "localhost" });
                    Response.Cookies.Append("X-Refresh-Token", RefreshToken, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict, Domain = "localhost" });

                    return Ok(RefreshToken);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
                return BadRequest(ModelState);

        }

        [HttpPost("verify")]
        public async Task<IActionResult> Verify()
        {
            if (!(Request.Cookies.TryGetValue("X-Username", out var userName) && Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken)))
                return BadRequest();

            Users? user = await _usersService.verifyToken(userName, refreshToken);
            if (user == null)
                return BadRequest();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            Claim[] claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("UserId", user._id.ToString()),
                new Claim("Username", user.username)
                                        };
            var token = new JwtSecurityToken(
                             _configuration["Jwt:Issuer"],
                             _configuration["Jwt:Audience"],
                             claims,
                             expires: DateTime.UtcNow.AddMinutes(10),
                             signingCredentials: signIn).ToString();

            user.refresh_token = Guid.NewGuid().ToString();

            await _usersService.UpdateAsync(user._id, user);

            Response.Cookies.Append("X-Access-Token", token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Append("X-Username", user.username, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
            Response.Cookies.Append("X-Refresh-Token", user.refresh_token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

            return Ok(user);
        }
         

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("X-Access-Token", new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });
            Response.Cookies.Delete("X-Username", new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });
            Response.Cookies.Delete("X-Refresh-Token", new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });
            return Ok();
        }



        [HttpPost]
        public async Task<TResult> createBuyOrder([FromBody] string username, string symbol, int quantity, string action, int price,  )
        {
            if (!(Request.Cookies.TryGetValue("X-Username", out var userName) && Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken)))
                return BadRequest();
            _usersService.verifyToken(username, )
            return Ok();
        }
        //private bool UsersExists(long id)
        //{
        //    return (_usersService.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}
