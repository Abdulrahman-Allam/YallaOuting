using Application.Dtos.Lookup.Request;
using Application.Dtos.Lookup.Response;
using Domain.Entities.Lookups;
using Domain.Results;

namespace Application.Contracts.Lookups
{
    public interface IDistrictService : ILookupService<District, DistrictLookupRequest, DistrictLookupResponse>
    {
        Task<OperationResultSingle<GovernorateLookupResponse>> GetDistrictGovernorate(int districtId);
    }
}
