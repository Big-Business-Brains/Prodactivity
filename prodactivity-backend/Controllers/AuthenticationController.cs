using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace prodactivity.Controllers
{
    [Route("[controller]")]
    public class AuthenticationController : BaseUserController
    {
        public AuthenticationController(AuthenticationService authenticationService) : base(authenticationService)
        {
        }

        [HttpPost("signUp")]
        [AllowAnonymous]
        public async Task<ActionResult<APIResponse>> Register([FromBody] RegisterRequest request)
        {
            if (ModelState.IsValid)
            {
                var result = await _authenticationService.RegisterUser(request);
                return Ok(new APIResponse(result));
            }

            return BadRequest(new APIResponse("Model is malformed"));
        }

        [HttpPost("signIn")]
        [AllowAnonymous]
        public async Task<ActionResult<APIResponse>> SignIn([FromBody] SignInRequest request)
        {
            if (ModelState.IsValid)
            {
                var result = await _authenticationService.SignInUser(request);
                return Ok(new APIResponse(result));
            }

            return BadRequest(new APIResponse("Model is malformed"));
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public async Task<ActionResult<APIResponse>> RefreshTokens([FromBody] RefreshTokensRequest request)
        {
            if (ModelState.IsValid)
            {
                var result = await _authenticationService.RefreshTokens(request.UserId, request.RefreshToken);
                return Ok(new APIResponse(result));
            }

            return BadRequest(new APIResponse("Model is malformed"));
        }
    }
}
