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

        // GET Calls

        [HttpGet]
        public ActionResult<List<RoutineGetResponse>> GetAll()
        {
            return Ok(new APIResponse(_routineService.GetAllRoutines(GetUserId())));
        }

        [HttpGet]
        [Route("byRoutineId")]
        public ActionResult<RoutineGetResponse> Get([FromQuery] String routineId)
        {
            return Ok(new APIResponse(_routineService.GetRoutineById(routineId)));
        }

        // POST Calls

        [HttpPost]
        public ActionResult Add([FromBody] RoutineAddRequest request)
        {
            _routineService.AddRoutine(request, GetUserId());
            return Ok();
        }

        [HttpPost]
        [Route("complete")]
        public ActionResult Complete([FromBody] RoutineCompletionRequest request)
        {
            _routineService.CompleteRoutine(request, GetUserId());
            return Ok();
        }
    }
}
