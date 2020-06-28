using System;
using System.ComponentModel.DataAnnotations;

namespace prodactivity
{
	public class RefreshTokensRequest
	{
        [Required]
        public string RefreshToken { get; set; }

        [Required]
        public string UserId { get; set; }
	}
}
