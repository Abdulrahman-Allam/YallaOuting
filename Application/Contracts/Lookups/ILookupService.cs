using Domain.Results;

namespace Application.Contracts.Lookups
{
    public interface ILookupService<T, T_Req, T_Res>
        where T : class
        where T_Req : class
        where T_Res : class
    {
        Task<OperationResultSingle<IEnumerable<T_Res>>> GetAllAsync();
        Task<OperationResultSingle<T_Res>> GetByIdAsync(int id);
        Task<OperationResultSingle<string>> AddAsync(T_Req entity);
        Task<OperationResultSingle<T_Res>> UpdateAsync(int id, T_Req newEntity);
        Task<OperationResultSingle<T_Res>> DeleteAsync(int id);
    }
}
