using Domain.Results;

namespace Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces
{
    public interface IOperationErrorFactory
    {
        OperationResultSingle<T> Unauthorized<T>();
        OperationResultSingle<T> BadRequest<T>(string message = "Bad Request");
        OperationResultSingle<T> BadRequest<T>(List<string> errors);
        OperationResultSingle<T> NotFound<T>(string message = "Not Found");
        OperationResultSingle<T> Conflict<T>(string message = "Conflict");
        OperationResultSingle<T> InternalServerError<T>(string message = "Internal Server Error");
    }
}
