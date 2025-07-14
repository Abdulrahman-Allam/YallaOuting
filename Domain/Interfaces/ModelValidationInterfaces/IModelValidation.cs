namespace Domain.Interfaces.ModelValidationInterfaces
{
    internal interface IModelValidation<T>
    {
        void Validate(T entity);
    }
}
