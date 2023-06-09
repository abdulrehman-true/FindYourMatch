using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // So that we don't need to add attributes to every controller. Now you can inherit from this class. Inheritance
    public class BaseApiController : ControllerBase
    {
        
    }
}