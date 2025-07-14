using Domain.Results;

namespace Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces
{
    public interface IOpertionSuccessFactory
    {
        OperationResultSingle<T> Deleted<T>();
        OperationResultSingle<T> EmailVerified<T>();
        OperationResultSingle<T> EmailSent<T>();
        OperationResultSingle<T> PasswordUpdated<T>();
        OperationResultSingle<T> Success<T>(T entity);
        OperationResultSingle<T> Uploaded<T>(T entity);
        OperationResultSingle<T> Updated<T>(T entity, string message = "Updated Successfully");
        OperationResultSingle<T> Created<T>(T entity, object meta = null!);
    }
}
