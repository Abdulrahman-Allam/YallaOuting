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
    public class GovernorateController : LookupController<Governorate, GovernorateLookupRequest, GovernorateLookupResponse>
    {
        public GovernorateController(IGovernorateService lookupService, IApiResponseFactory responseFactory) : base(lookupService, responseFactory)
        {
        }

        [HttpGet("DistrictsOfGovernorate{governorateId}")]
        public async Task<IActionResult> DistrictsOfGovernorate([FromRoute] int governorateId)
        {
            var operationResult = await ((IGovernorateService)_lookupService).GetGovernorateDistricts(governorateId);
            return _responseFactory.CreateApiResponse(operationResult);
        }

        [HttpGet("CountryOfGovernorate{governorateId}")]
        public async Task<IActionResult> CountryOfGovernorate([FromRoute] int governorateId)
        {
            var operationResult = await ((IGovernorateService)_lookupService).GetGovernorateCountry(governorateId);
            return _responseFactory.CreateApiResponse(operationResult);
        }
    }
}
