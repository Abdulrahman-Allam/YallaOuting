using Application.Dtos.YallaOutingUser.Request;
using Application.Dtos.YallaOutingUser.Response;
using AutoMapper;
using Domain.Entities.User;

namespace Application.Mapping
{
    public class YallaOutingUserMappingProfile : Profile
    {
        public YallaOutingUserMappingProfile()
        {
            CreateMap<RegisterUserRequest, YallaOutingUser>();
            
            CreateMap<YallaOutingUser, UserAuthResponse>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id));
        }
    }
}