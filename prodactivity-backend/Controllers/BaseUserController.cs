using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Threading.Tasks;

namespace prodactivity
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class BaseUserController : ControllerBase
    {
        protected readonly AuthenticationService _authenticationService;

        public BaseUserController(AuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [NonAction]
        public async Task<ApplicationUser> GetUser()
        {
            return await _authenticationService.getUserById(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
        }

        [NonAction]
        public Guid GetUserId()
        {
            return new Guid(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
