using System;
using Microsoft.AspNetCore.Identity;

namespace prodactivity
{
    public class ApplicationUser : IdentityUser
    {
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
    }
}
