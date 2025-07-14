using System.Net;
using System.Text.Json;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Domain.Exceptions;
using Domain.Results;
using Domain.Interfaces.CommonInterfaces;

namespace Presentation.Middlewares
{
    public class GlobalExceptionHandler : IMiddleware
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;
        private readonly IApiResponseFactory _responseFactory;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger, IApiResponseFactory responseFactory)
        {
            _logger = logger;
            _responseFactory = responseFactory;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context); // Proceed to the next middleware/endpoint
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex); // Handle any thrown exception
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            // Log the exception with detailed information
            _logger.LogError(exception, "An unhandled exception occurred during request processing.");

            // Prepare the response model
            var response = context.Response;
            response.ContentType = "application/json";

            var responseModel = new OperationResultSingle<string>
            {
                Succeeded = false,
                Message = exception.Message,
                StatusCode = HttpStatusCode.InternalServerError, //default
                
            };

            // Set specific error details based on the exception type
            response.StatusCode = exception switch
            {
                UnauthorizedAccessException ex => SetErrorDetails(HttpStatusCode.Unauthorized, ex, responseModel),
                ValidationException ex => SetErrorDetails(HttpStatusCode.UnprocessableEntity, ex, responseModel),
                EntityValidationException ex => SetErrorDetails(HttpStatusCode.UnprocessableEntity, ex, responseModel, ex.Errors),
                KeyNotFoundException ex => SetErrorDetails(HttpStatusCode.NotFound, ex, responseModel),
                DbUpdateException ex => SetErrorDetails(HttpStatusCode.BadRequest, ex, responseModel),
                _ => SetErrorDetails(HttpStatusCode.InternalServerError, exception, responseModel), // Generic for any other exceptions
            };

            // Serialize the response model to JSON and write it to the response body
            var result = JsonSerializer.Serialize(responseModel);
            await response.WriteAsync(result);
        }

        private int SetErrorDetails(HttpStatusCode statusCode, Exception exception, OperationResultSingle<string> responseModel, object? errors = null)
        {
            responseModel.StatusCode = statusCode;
            responseModel.Message = exception.Message;

            // Check if 'errors' is null, and if not, convert it to a List<string>
            responseModel.Errors = errors switch
            {
                null => new List<string>(), // If errors is null, set it to an empty list
                IEnumerable<string> stringList => stringList.ToList(), // If errors is already a list of strings, use it
                _ => new List<string> { errors.ToString()! } // Otherwise, convert the error object to a single error message
            };

            // Log the error details for debugging purposes
            _logger.LogWarning($"Exception: {exception.GetType().Name}, Message: {exception.Message}, StatusCode: {statusCode}");

            return (int)statusCode;
        }

    }
}

