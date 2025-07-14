using FluentValidation.Results;

namespace Domain.Exceptions
{
    public sealed class EntityValidationException : Exception
    {
        public EntityValidationException() : base("One or more validation failures have occurred.")
        {
            Errors = new List<string>();
        }

        public EntityValidationException(IEnumerable<ValidationFailure> failures) : this()
        {
            Errors = failures.Select(failure => failure.ErrorMessage).ToList();
        }
        public List<string> Errors { get; }

        public override string ToString()
        {
            return $"{base.ToString()} - Validation Errors: {string.Join(", ", Errors)}";
        }
    }
}
