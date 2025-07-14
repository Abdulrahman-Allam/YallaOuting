namespace Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces
{
    public interface IOperationResultFactory:
        IOpertionSuccessFactory,
        IOperationErrorFactory,
        IOperationValidationFactory,
        IOperationGeneralFactory
    {         
    }
}
