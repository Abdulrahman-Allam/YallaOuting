using Application.Dtos.Lookup.Request;
using Application.Dtos.Lookup.Response;
using AutoMapper;
using Domain.Entities.Lookups;

namespace Application.MappingProfiles
{
    public class LookupMapper : Profile
    {
        public LookupMapper()
        {
            CreateMap<AccountStatus, AccountStatusLookupResponse>();
            CreateMap<Country, CountryLookupResponse>();
            CreateMap<District, DistrictLookupResponse>();
            CreateMap<Gender, GenderLookupResponse>();
            CreateMap<Governorate, GovernorateLookupResponse>();


            CreateMap<AccountStatusLookupRequest, AccountStatus>();
            CreateMap<CountryLookupRequest, Country>();
            CreateMap<DistrictLookupRequest, District>();
            CreateMap<GenderLookupRequest, Gender>();
            CreateMap<GovernorateLookupRequest, Governorate>();
        }
    }
}