using AutoMapper;
using prodactivity;

public class ProdactivityMappingProfile : Profile
{
	public ProdactivityMappingProfile()
	{
        // Routines
		CreateMap<Routine, RoutineRequest>();
        CreateMap<Routine, RoutineResponse>();
	}
}