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


namespace net_finance_api.Controllers
{
    //[Route("api/[controller]")]

    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService)
        {
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
        public async Task<IActionResult?> Login([FromBody] Users user)
        {
            Users? loginResponse = await _usersService.Login(user);

            //return loginResponse ?? null;
            return loginResponse != null ? Ok(loginResponse) : BadRequest(new { message = "Invalid Username or Password"}) ;
        }
        //private bool UsersExists(long id)
        //{
        //    return (_usersService.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        //}
    }
}
