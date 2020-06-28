using System;
using AutoMapper;
using System.Collections.Generic;

namespace prodactivity
{
    public class RoutineInstanceRepository : UserObjectRepository<RoutineInstance>
    {
        DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public RoutineInstanceRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext, mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public List<RoutineInstance> RetrieveByDate(Guid userId, DateTime date)
        {
            return RetrieveByExpression(i => i.UserId == userId && i.Date == date);
        }
    }
}