using Dapper;

namespace Domain.Interfaces.SPCallInterfaces
{
    public interface ISPCall
    {

        Task ExecuteAsync(string procedureName, DynamicParameters? parameters = null);

        Task<IEnumerable<T>> ListAsync<T>(string procedureName, DynamicParameters? parameters = null);

        Task<(IEnumerable<T1>, IEnumerable<T2>)> ListAsync<T1, T2>(string procedureName, DynamicParameters? parameters = null);

        Task<T?> OneRecordAsync<T>(string procedureName, DynamicParameters? parameters = null);

        Task<T> SingleAsync<T>(string procedureName, DynamicParameters? parameters = null);

        Task ExecuteBatchAsync(IEnumerable<(string ProcedureName, DynamicParameters? Parameters)> batch);
    }
}
