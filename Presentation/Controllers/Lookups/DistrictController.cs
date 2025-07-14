using Application.Contracts.Lookups;
using Application.Dtos.Lookup.Request;
using Application.Dtos.Lookup.Response;
using Domain.Entities.Lookups;
using Domain.Interfaces.CommonInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers.Lookups
{
    [Route("api/[controller]")]
    [ApiController]
    public class DistrictController : LookupController<District, DistrictLookupRequest, DistrictLookupResponse>
    {
        public DistrictController(IDistrictService lookupService, IApiResponseFactory responseFactory) : base(lookupService, responseFactory)
        {
        }

        [HttpGet("GovernorateOfDistrict{districtId}")]
        public async Task<IActionResult> GovernorateOfDistrict([FromRoute] int districtId)
        {
            var operationResult = await ((IDistrictService)_lookupService).GetDistrictGovernorate(districtId);
            return _responseFactory.CreateApiResponse(operationResult);
        }

    }
}
