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
    public class AccountStatusController : LookupController<AccountStatus, AccountStatusLookupRequest, AccountStatusLookupResponse>
    {
        public AccountStatusController(ILookupService<AccountStatus, AccountStatusLookupRequest, AccountStatusLookupResponse> lookupService, IApiResponseFactory responseFactory) : base(lookupService, responseFactory)
        {
        }
    }
}