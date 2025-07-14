namespace Domain.Interfaces.UnitOfWorkInterfaces
{
    public interface ISaveUnitOfWork
    {
        int Save();
        Task<int> SaveAsync();
    }
}
