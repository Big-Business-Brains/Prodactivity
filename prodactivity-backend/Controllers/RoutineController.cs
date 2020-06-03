using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace prodactivity.Controllers
{
    [Route("[controller]")]
    public class RoutineController : BaseUserController
    {
        private readonly ILogger<RoutineController> _logger;
		private readonly RoutineService _routineService;

        public RoutineController(
            AuthenticationService authenticationService,
            ILogger<RoutineController> logger, 
            RoutineService routineService) 
            : base(authenticationService)
        {
            _logger = logger;
			_routineService = routineService;
        }

        [HttpGet]
		public ActionResult<List<RoutineResponse>> GetAll()
		{			
			return Ok(new APIResponse(_routineService.GetAllRoutines()));
		}

		[HttpGet]
        [Route("byRoutineId")]
		public ActionResult<RoutineResponse> Get([FromQuery] String routineId)
		{			
			return Ok(new APIResponse(_routineService.GetRoutineById(routineId)));
		}

        [HttpPost]
        public ActionResult Add([FromBody] RoutineRequest request)
        {
            _routineService.AddRoutine(request);
            return Ok();
        }
    }
}
