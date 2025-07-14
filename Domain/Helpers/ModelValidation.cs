using Domain.Exceptions;
using Domain.Interfaces.ModelValidationInterfaces;
using FluentValidation;

namespace Domain.Validation
{
    public class ValidationService<T>: IModelValidation<T>
    {
        private readonly IValidator<T> _validator;

        public ValidationService(IValidator<T> validator)
        {
            _validator = validator ?? throw new ArgumentNullException(nameof(validator));
        }

        public void Validate(T entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            var result = _validator.Validate(entity);

            if (!result.IsValid)
            {
                throw new EntityValidationException(result.Errors);
            }
        }
    }
}
