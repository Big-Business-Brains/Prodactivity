using AutoMapper;

namespace prodactivity
{
    public class BaseService
    {
        public IMapper _mapper;

        public BaseService(IMapper mapper)
        {
            _mapper = mapper;
        }
    }
}