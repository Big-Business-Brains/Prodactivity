using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace prodactivity
{
    public class AuthenticationService {

        private readonly AuthenticationServiceHelper _authenticationServiceHelper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthenticationService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration) 
        {
            _authenticationServiceHelper = new AuthenticationServiceHelper();
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        public async Task<AuthenticationResponse> RegisterUser(RegisterRequest registerDTO) 
        {
            var user = new ApplicationUser {
                UserName = registerDTO.Email,
                Email = registerDTO.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: true);
                return await GenerateAndSaveTokens(user);
            }
            else
            {
                throw new APIException(StatusCode.BAD_REQUEST, result.Errors.FirstOrDefault().Description);
            }
        }

        public async Task<AuthenticationResponse> SignInUser(SignInRequest signInRequest) 
        {
            var result = await _signInManager.PasswordSignInAsync(signInRequest.Email, signInRequest.Password, true, false);
            if (result.Succeeded)
            {
                var user = _userManager.Users.SingleOrDefault(r => r.Email == signInRequest.Email);
                return await GenerateAndSaveTokens(user);
            }
            else
            {
                throw new APIException(StatusCode.BAD_REQUEST, "Sign in failed, check email and password and try again.");
            }
        }

        public async Task<AuthenticationResponse> RefreshTokens(string userId, string refreshToken) 
        {
            var user = await getUserById(userId);
            _authenticationServiceHelper.ValidateRefreshToken(user, refreshToken);
            return await GenerateAndSaveTokens(user);
        }

        public async Task<AuthenticationResponse> GenerateAndSaveTokens(ApplicationUser user)
        {
            var authenticationDTO = new AuthenticationResponse() {
                    UserId = new Guid(user.Id),
                    AccessToken = _authenticationServiceHelper.GenerateJWTToken(_configuration, user),
                    RefreshToken = _authenticationServiceHelper.GenerateRefreshToken(),
                    RefreshTokenExpiration = _authenticationServiceHelper.GenerateRefreshTokenExpiration()
                };

            user.RefreshToken = authenticationDTO.RefreshToken;
            user.RefreshTokenExpiration = authenticationDTO.RefreshTokenExpiration;

            await _userManager.UpdateAsync(user);

            return authenticationDTO;
        }

        public async Task<ApplicationUser> getUserById(string userId) 
        {
            return await _userManager.FindByIdAsync(userId);
        }
    }

    public class AuthenticationServiceHelper {

        public AuthenticationServiceHelper() {
        }

        public string GenerateJWTToken(IConfiguration _configuration, ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public DateTime GenerateRefreshTokenExpiration()
        {
            return DateTime.UtcNow.AddDays(30);
        }

        public void ValidateRefreshToken(ApplicationUser user, string refreshToken)
        {
            if (user == null || !(user.RefreshToken == refreshToken))
            {
                throw new APIException(StatusCode.UNAUTHORIZED, "Refresh token is invalid");
            }

            if (DateTime.UtcNow > user.RefreshTokenExpiration)
            {
                throw new APIException(StatusCode.UNAUTHORIZED, "Refresh token is expired");
            }
        }
    }
}