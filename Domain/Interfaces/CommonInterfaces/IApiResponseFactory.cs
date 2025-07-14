using Domain.Results;
using Microsoft.AspNetCore.Mvc;

namespace Domain.Interfaces.CommonInterfaces
{
    public interface IApiResponseFactory
    {
        ObjectResult CreateApiResponse<T>(OperationResultBase<T> response);
    }
}