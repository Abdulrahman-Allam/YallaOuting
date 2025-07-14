using Application.Dtos.Authentication.Request;
using Application.Dtos.Authentication.Response;
using Application.Dtos.Lookup.Request;
using Application.Dtos.Lookup.Response;
using AutoMapper;
using Domain.Entities.Lookups;
using Domain.Entities.User;

namespace Application.MappingProfiles
{
    public class UserMapper : Profile
    {
        public UserMapper()
        {
            CreateMap<CreateAdminRequest, Admin>();


            CreateMap<ApplicationUser, AuthenticationResponse>()
                .ForMember(dest => dest.Gender_En, opt => opt.MapFrom(src => src.Gender.Name_En))
                .ForMember(dest => dest.Gender_Ar, opt => opt.MapFrom(src => src.Gender.Name_Ar))
                .ForMember(dest => dest.Country_En, opt => opt.MapFrom(src => src.Country.Name_En))
                .ForMember(dest => dest.Country_Ar, opt => opt.MapFrom(src => src.Country.Name_Ar))
                .ForMember(dest => dest.Governorate_En, opt => opt.MapFrom(src => src.Governorate.Name_En))
                .ForMember(dest => dest.Governorate_Ar, opt => opt.MapFrom(src => src.Governorate.Name_Ar))
                .ForMember(dest => dest.District_En, opt => opt.MapFrom(src => src.District.Name_En))
                .ForMember(dest => dest.District_Ar, opt => opt.MapFrom(src => src.District.Name_Ar))
                .ForMember(dest => dest.AccountStatus_En, opt => opt.MapFrom(src => src.AccountStatus.Name_En))
                .ForMember(dest => dest.AccountStatus_ar, opt => opt.MapFrom(src => src.AccountStatus.Name_Ar))
                .ForMember(dest => dest.ApplicationRole_En, opt => opt.MapFrom(src => src.ApplicationRole.Name))
                .ForMember(dest => dest.ApplicationRole_Ar, opt => opt.MapFrom(src => src.ApplicationRole.Name))
                .ForMember(dest => dest.ApplicationRole_ID, opt => opt.MapFrom(src => src.ApplicationRole.Id));
        }
    }
}