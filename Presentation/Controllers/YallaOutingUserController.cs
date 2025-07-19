using Application.Contracts.YallaOutingUser;
using Application.Dtos.YallaOutingUser.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class YallaOutingUserController : ControllerBase
    {
        private readonly IYallaOutingUserService _userService;

        public YallaOutingUserController(IYallaOutingUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.RegisterAsync(request);

            return result.StatusCode switch
            {
                System.Net.HttpStatusCode.Created => Created(string.Empty, result),
                System.Net.HttpStatusCode.BadRequest => BadRequest(result),
                System.Net.HttpStatusCode.InternalServerError => StatusCode(500, result),
                _ => StatusCode(500, result)
            };
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.LoginAsync(request);

            return result.StatusCode switch
            {
                System.Net.HttpStatusCode.OK => Ok(result),
                System.Net.HttpStatusCode.Unauthorized => Unauthorized(result),
                System.Net.HttpStatusCode.InternalServerError => StatusCode(500, result),
                _ => StatusCode(500, result)
            };
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            // Get user ID from JWT token claims
            var userIdClaim = User.FindFirst("id")?.Value;
            if (!int.TryParse(userIdClaim, out int userId))
            {
                return BadRequest("Invalid user ID");
            }

            var result = await _userService.LogoutAsync(userId);

            return result.StatusCode switch
            {
                System.Net.HttpStatusCode.OK => Ok(result),
                System.Net.HttpStatusCode.InternalServerError => StatusCode(500, result),
                _ => StatusCode(500, result)
            };
        }
    }
}