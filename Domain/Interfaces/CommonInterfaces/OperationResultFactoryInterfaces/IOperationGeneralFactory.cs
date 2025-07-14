using Domain.Results;

namespace Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces
{
    public interface IOperationGeneralFactory
    {
        OperationResultSingle<T> Forbidden<T>(string message = "Forbidden");
        OperationResultSingle<T> Accepted<T>(string message = "Request Accepted");
        OperationResultSingle<T> ServiceUnavailable<T>(string message = "Service Unavailable");
        OperationResultSingle<T> UnauthorizedAccess<T>(string message = "Unauthorized Access");
    }
}
