using System;
using System.Collections.Generic;

namespace prodactivity
{
    public class RoutineService {

        private readonly RoutineServiceHelper _routineServiceHelper;
        private readonly RoutineRepository _routineRepository;

        public RoutineService(RoutineRepository routineRepository) 
        {
            _routineServiceHelper = new RoutineServiceHelper();
            _routineRepository = routineRepository;
        }

        public List<RoutineResponse> GetAllRoutines()
        {
            return _routineRepository.RetrieveAll<RoutineResponse>();
        }

        public RoutineResponse GetRoutineById(string routineId)
        {
            return _routineRepository.Retrieve<RoutineResponse>(new Guid(routineId));
        }

        public void AddRoutine(RoutineRequest request)
        {
            var routine = new Routine() {
                Name = request.Name
            };

            _routineRepository.Create(routine);
        }
    }

    public class RoutineServiceHelper {

        public RoutineServiceHelper() {
        }
    }
}