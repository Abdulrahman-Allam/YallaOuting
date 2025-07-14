using Domain.Results;

namespace Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces
{
    public interface IOperationValidationFactory
    {
        OperationResultSingle<T> ValidationError<T>(List<string> errors);
        OperationResultSingle<T> ValidationError<T>(string error);
    }
}
