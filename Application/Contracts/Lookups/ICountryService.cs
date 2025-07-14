using Application.Dtos.Lookup.Request;
using Application.Dtos.Lookup.Response;
using Domain.Entities.Lookups;
using Domain.Results;

namespace Application.Contracts.Lookups
{
    public interface ICountryService : ILookupService<Country, CountryLookupRequest, CountryLookupResponse>
    {
        Task<OperationResultSingle<IEnumerable<GovernorateLookupResponse>>> GetCountryGovernorates(int countryId);
    }
}
