namespace Domain.Interfaces.UnitOfWorkInterfaces
{
    public interface IUnitOfWork :
        ISaveUnitOfWork,
        IRepositoryUnitOfWork,
        IDisposeUnitOfWork
    {
    }
}
