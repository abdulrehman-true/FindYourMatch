using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks.Sources;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountsController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly ITokenService _tokenService;
        public AccountsController(DataContext dataContext, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _dataContext = dataContext;
        }

        [HttpPost("register")] // post api/account/register
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if(await UserExists(registerDTO.Username)) return BadRequest("User name is taken");
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDTO.Username.ToLower(), 
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key
            };
            _dataContext.Add(user);
            await _dataContext.SaveChangesAsync();

            return new UserDTO
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _dataContext.Users
                .FirstOrDefaultAsync(c=> c.UserName == loginDTO.UserName.ToLower());
            if(user is null) return Unauthorized("Invalid User name");
            //Decripting the password that we encrypted while saving to the database

            using var hmac =  new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for(int i=0; i<computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }    

            return new UserDTO
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };

        }

        private async Task<bool> UserExists(string username)
        {
            return await _dataContext.Users.AnyAsync(c=> c.UserName == username.ToLower());
        }
    }
}