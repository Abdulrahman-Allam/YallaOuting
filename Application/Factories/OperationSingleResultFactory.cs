using Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces;
using Domain.Results;
using System.Net;

namespace Application.Factories
{
    public class OperationSingleResultFactory : IOperationResultFactory
    {
        // Implementing Success Responses
        public OperationResultSingle<T> Deleted<T>() => new OperationResultSingle<T> { StatusCode = HttpStatusCode.OK, Succeeded = true, Message = "Deleted Successfully" };
        public OperationResultSingle<T> EmailVerified<T>() => new OperationResultSingle<T> { StatusCode = HttpStatusCode.OK, Succeeded = true, Message = "Email Verified Successfully" };
        public OperationResultSingle<T> EmailSent<T>() => new OperationResultSingle<T> { StatusCode = HttpStatusCode.OK, Succeeded = true, Message = "Email Sent Successfully" };
        public OperationResultSingle<T> PasswordUpdated<T>() => new OperationResultSingle<T> { StatusCode = HttpStatusCode.OK, Succeeded = true, Message = "Password Updated Successfully" };
        public OperationResultSingle<T> Success<T>(T entity) => new OperationResultSingle<T> { Data = entity, StatusCode = HttpStatusCode.OK, Succeeded = true };
        public OperationResultSingle<T> Uploaded<T>(T entity) => new OperationResultSingle<T> { Data = entity, StatusCode = HttpStatusCode.OK, Succeeded = true, Message = "Uploaded Successfully" };
        public OperationResultSingle<T> Updated<T>(T entity, string message = "Updated Successfully") => new OperationResultSingle<T> { Data = entity, StatusCode = HttpStatusCode.OK, Succeeded = true, Message = message };
        public OperationResultSingle<T> Created<T>(T entity, object meta = null!) => new OperationResultSingle<T> { Data = entity, StatusCode = HttpStatusCode.Created, Succeeded = true };

        // Implementing Error Responses
        public OperationResultSingle<T> Unauthorized<T>() => new OperationResultSingle<T> { StatusCode = HttpStatusCode.Unauthorized, Succeeded = false, Message = "Unauthorized" };
        public OperationResultSingle<T> BadRequest<T>(string message = "Bad Request") => new OperationResultSingle<T> { StatusCode = HttpStatusCode.BadRequest, Succeeded = false, Message = message };
        public OperationResultSingle<T> BadRequest<T>(List<string> errors) => new OperationResultSingle<T> { StatusCode = HttpStatusCode.BadRequest, Succeeded = false, Errors = errors };
        public OperationResultSingle<T> NotFound<T>(string message = "Not Found") => new OperationResultSingle<T> { StatusCode = HttpStatusCode.NotFound, Succeeded = false, Message = message };
        public OperationResultSingle<T> Conflict<T>(string message = "Conflict") => new OperationResultSingle<T> { StatusCode = HttpStatusCode.Conflict, Succeeded = false, Message = message };
        public OperationResultSingle<T> InternalServerError<T>(string message = "Internal Server Error") => new OperationResultSingle<T> { StatusCode = HttpStatusCode.InternalServerError, Succeeded = false, Message = message };

        // Implementing Validation Responses
        public OperationResultSingle<T> ValidationError<T>(List<string> errors) => new OperationResultSingle<T> { StatusCode = HttpStatusCode.UnprocessableEntity, Succeeded = false, Errors = errors, Message = "Validation Errors" };
        public OperationResultSingle<T> ValidationError<T>(string error) => new OperationResultSingle<T> { StatusCode = HttpStatusCode.UnprocessableEntity, Succeeded = false, Errors = new List<string> { error }, Message = "Validation Error" };

        // Implementing Other Common Responses
        public OperationResultSingle<T> Forbidden<T>(string message = "Forbidden") => new OperationResultSingle<T> { StatusCode = HttpStatusCode.Forbidden, Succeeded = false, Message = message };
        public OperationResultSingle<T> Accepted<T>(string message = "Request Accepted") => new OperationResultSingle<T> { StatusCode = HttpStatusCode.Accepted, Succeeded = true, Message = message };
        public OperationResultSingle<T> ServiceUnavailable<T>(string message = "Service Unavailable") => new OperationResultSingle<T> { StatusCode = HttpStatusCode.ServiceUnavailable, Succeeded = false, Message = message };
        public OperationResultSingle<T> UnauthorizedAccess<T>(string message = "Unauthorized Access") => new OperationResultSingle<T> { StatusCode = HttpStatusCode.Unauthorized, Succeeded = false, Message = message };

    }
}
