using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Presentation.Filters
{

    public sealed class ModelValidationFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            // Loop through action arguments to find models to validate
            foreach (var argument in context.ActionArguments.Values)
            {
                if (argument == null) continue;

                // Resolve the appropriate FluentValidation validator for the model
                var modelType = argument.GetType();
                var validatorType = typeof(IValidator<>).MakeGenericType(modelType);
                var validator = context.HttpContext.RequestServices.GetService(validatorType) as IValidator;

                if (validator != null)
                {
                    // Create a ValidationContext for the model
                    var validationContext = new ValidationContext<object>(argument);

                    // Perform validation
                    ValidationResult validationResult = validator.Validate(validationContext);

                    if (!validationResult.IsValid)
                    {
                        // Return a 400 Bad Request with validation errors
                        context.Result = new BadRequestObjectResult(new
                        {
                            Message = "Validation failed",
                            Errors = validationResult.Errors.Select(e => new
                            {
                                Property = e.PropertyName,
                                Error = e.ErrorMessage
                            })
                        });

                        return;
                    }
                }
            }
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Nothing
        }
    }
}
