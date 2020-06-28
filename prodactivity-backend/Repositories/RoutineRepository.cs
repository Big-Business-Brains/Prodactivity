using System;
using AutoMapper;

namespace prodactivity
{
    public class RoutineRepository : UserObjectRepository<Routine>
    {
        DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public RoutineRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext, mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }
    }
}