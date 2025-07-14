using Application.Contracts.Lookups;
using Domain.Interfaces.CommonInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers.Lookups
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookupController<T, T_Req, T_Res> : ControllerBase
        where T : class
        where T_Req : class
        where T_Res : class
    {
        protected readonly ILookupService<T, T_Req, T_Res> _lookupService;
        protected readonly IApiResponseFactory _responseFactory;

        public LookupController(ILookupService<T, T_Req, T_Res> lookupService, IApiResponseFactory responseFactory)
        {
            _lookupService = lookupService;
            _responseFactory = responseFactory;
        }

        [HttpGet("all")]
        public virtual async Task<IActionResult> GetAll()
        {
            var operationResult = await _lookupService.GetAllAsync();
            return _responseFactory.CreateApiResponse(operationResult);
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById([FromRoute] int id)
        {
            var operationResult = await _lookupService.GetByIdAsync(id);
            return _responseFactory.CreateApiResponse(operationResult);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Create([FromBody] T_Req entity)
        {
            var operationResult = await _lookupService.AddAsync(entity);
            return _responseFactory.CreateApiResponse(operationResult);
        }

        [HttpPost("{id}")]
        public virtual async Task<IActionResult> Update([FromRoute] int id, [FromBody] T_Req entity)
        {
            var operationResult = await _lookupService.UpdateAsync(id, entity);
            return _responseFactory.CreateApiResponse(operationResult);
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete([FromRoute] int id)
        {
            var operationResult = await _lookupService.DeleteAsync(id);
            return _responseFactory.CreateApiResponse(operationResult);
        }
    }
}