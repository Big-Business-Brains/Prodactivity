using System;
using System.ComponentModel.DataAnnotations;

namespace prodactivity
{
	public class AuthenticationResponse
	{
        [Required]
        public Guid UserId { get; set; }
        
        [Required]
		public string AccessToken { get; set; }

        [Required]
        public string RefreshToken { get; set; }

        [Required]
        public DateTime RefreshTokenExpiration { get; set; }
	}
}
