using System;
using System.Collections.Generic;
using AutoMapper;

namespace prodactivity
{
    public class RoutineService : BaseService
    {

        private readonly RoutineServiceHelper _routineServiceHelper;
        private readonly RoutineRepository _routineRepository;
        private readonly RoutineInstanceRepository _routineInstanceRepository;

        public RoutineService(
            IMapper mapper,
            RoutineRepository routineRepository,
            RoutineInstanceRepository routineInstanceRepository)
            : base(mapper)
        {
            _routineServiceHelper = new RoutineServiceHelper();
            _routineRepository = routineRepository;
            _routineInstanceRepository = routineInstanceRepository;
        }

        public List<RoutineGetResponse> GetAllRoutines(Guid userId)
        {
            return _routineRepository.RetrieveAllByUserId<RoutineGetResponse>(userId);
        }

        public RoutineGetResponse GetRoutineById(string routineId)
        {
            return _routineRepository.Retrieve<RoutineGetResponse>(new Guid(routineId));
        }

        public void AddRoutine(RoutineAddRequest request, Guid userId)
        {
            // Add a new Routine to the db
            var routine = new Routine()
            {
                Name = request.Name,
                UserId = userId,
                RecurrenceRule = new RRule()
                {
                    DTStart = request.RecurrenceRule.DTStart,
                    Freq = request.RecurrenceRule.Freq,
                    Interval = request.RecurrenceRule.Interval,
                    ByMonth = request.RecurrenceRule.ByMonth,
                    ByMonthDay = request.RecurrenceRule.ByMonthDay,
                    ByWeekday = request.RecurrenceRule.ByWeekday,
                }
            };

            _routineRepository.Create(routine);
        }

        public void CompleteRoutine(RoutineCompletionRequest request, Guid userId)
        {
            RoutineInstance routineInstance = null;

            if (!request.RoutineInstanceId.HasValue)
            {
                routineInstance = new RoutineInstance()
                {
                    Id = new Guid(),
                    UserId = userId,
                    RoutineId = request.RoutineId,
                    Date = request.Date,
                    Completed = request.Completed
                };

                _routineInstanceRepository.Create(routineInstance);
            }
            else
            {
                routineInstance = _routineInstanceRepository.Retrieve(request.RoutineInstanceId.Value);
                routineInstance.Date = request.Date;
                routineInstance.Completed = request.Completed;

                _routineInstanceRepository.Update(routineInstance);
            }
        }
    }

    public class RoutineServiceHelper
    {

        public RoutineServiceHelper()
        {
        }
    }
}