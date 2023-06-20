using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController // Responsible for handling http response api errors and sending it to client
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;

        }


        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var itemToFind = _context.Users.Find(-1);
            if(itemToFind is null) return NotFound();
            return itemToFind;
        }


        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var itemToFind = _context.Users.Find(-1);
            var returnItem = itemToFind.ToString();
            return returnItem;
        }


        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("Wasn't a good request");
        }


    }
}