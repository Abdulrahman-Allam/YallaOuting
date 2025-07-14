using Application.Contracts.Lookups;
using Application.Dtos.Lookup.Request;
using Application.Dtos.Lookup.Response;
using Application.Services.Lookups;
using Domain.Entities.Lookups;
using Domain.Interfaces.CommonInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers.Lookups
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : LookupController<Country, CountryLookupRequest, CountryLookupResponse>
    {
        public CountryController(ICountryService lookupService, IApiResponseFactory responseFactory) : base(lookupService, responseFactory)
        {
        }

        [HttpGet("GovernoratesOfCountry{countryId}")]
        public async Task<IActionResult> GovernoratesOfCountry([FromRoute] int countryId)
        {
            var operationResult = await ((ICountryService)_lookupService).GetCountryGovernorates(countryId);
            return _responseFactory.CreateApiResponse(operationResult);
        }
    }
}
