namespace Domain.Interfaces.UnitOfWorkInterfaces
{
    public interface IDisposeUnitOfWork :
        IDisposable,
        IAsyncDisposable
    {
    }
}
