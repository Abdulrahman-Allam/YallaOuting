using Application.Dtos.Lookup.Request;
using Application.Dtos.Lookup.Response;
using Domain.Entities.Lookups;
using Domain.Results;

namespace Application.Contracts.Lookups
{
    public interface IGovernorateService : ILookupService<Governorate, GovernorateLookupRequest, GovernorateLookupResponse>
    {
        Task<OperationResultSingle<CountryLookupResponse>> GetGovernorateCountry(int governorateId);
        Task<OperationResultSingle<IEnumerable<DistrictLookupResponse>>> GetGovernorateDistricts(int governorateId);

    }
}
