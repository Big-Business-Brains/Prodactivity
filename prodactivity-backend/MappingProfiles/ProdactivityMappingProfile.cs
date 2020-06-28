using AutoMapper;
using prodactivity;

public class ProdactivityMappingProfile : Profile
{
    public ProdactivityMappingProfile()
    {
        // Routines
        CreateMap<Routine, RoutineGetResponse>();

        // RRule
        CreateMap<RRule, RRuleDTO>();
    }
}