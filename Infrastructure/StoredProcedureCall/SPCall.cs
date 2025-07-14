using Dapper;
using Domain.Interfaces.SPCallInterfaces;
using Infrastructure.Data;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Infrastructure.StoredProcedureCall
{
    public sealed class SPCall: ISPCall
    {
        private readonly string _connectionString;

        public SPCall()
        {
            _connectionString = DbConnection.DefaultConnection;
        }

        public void Dispose()
        {
            // Placeholder for any future resource cleanup logic.
        }

        public async Task ExecuteAsync(string procedureName, DynamicParameters? parameters = null)
        {
            using var sqlConn = new SqlConnection(_connectionString);
            try
            {
                await sqlConn.OpenAsync();
                await sqlConn.ExecuteAsync(procedureName, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error executing stored procedure '{procedureName}': {ex.Message}", ex);
            }
        }

        public async Task<IEnumerable<T>> ListAsync<T>(string procedureName, DynamicParameters? parameters = null)
        {
            using var sqlConn = new SqlConnection(_connectionString);
            try
            {
                await sqlConn.OpenAsync();
                return await sqlConn.QueryAsync<T>(procedureName, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving list from stored procedure '{procedureName}': {ex.Message}", ex);
            }
        }

        public async Task<(IEnumerable<T1>, IEnumerable<T2>)> ListAsync<T1, T2>(string procedureName, DynamicParameters? parameters = null)
        {
            using var sqlConn = new SqlConnection(_connectionString);
            try
            {
                await sqlConn.OpenAsync();
                using var result = await sqlConn.QueryMultipleAsync(procedureName, parameters, commandType: CommandType.StoredProcedure);

                var set1 = await result.ReadAsync<T1>();
                var set2 = await result.ReadAsync<T2>();
                return (set1, set2);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving multiple result sets from stored procedure '{procedureName}': {ex.Message}", ex);
            }
        }

        public async Task<T?> OneRecordAsync<T>(string procedureName, DynamicParameters? parameters = null)
        {
            using var sqlConn = new SqlConnection(_connectionString);
            try
            {
                await sqlConn.OpenAsync();
                return await sqlConn.QueryFirstOrDefaultAsync<T>(procedureName, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving one record from stored procedure '{procedureName}': {ex.Message}", ex);
            }
        }

        public async Task<T?> SingleAsync<T>(string procedureName, DynamicParameters? parameters = null)
        {
            using var sqlConn = new SqlConnection(_connectionString);
            try
            {
                await sqlConn.OpenAsync();
                return await sqlConn.ExecuteScalarAsync<T>(procedureName, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error executing scalar query for stored procedure '{procedureName}': {ex.Message}", ex);
            }
        }

        public async Task ExecuteBatchAsync(IEnumerable<(string ProcedureName, DynamicParameters? Parameters)> batch)
        {
            using var sqlConn = new SqlConnection(_connectionString);
            try
            {
                await sqlConn.OpenAsync();
                using var transaction = await sqlConn.BeginTransactionAsync();

                foreach (var (procedureName, parameters) in batch)
                {
                    await sqlConn.ExecuteAsync(procedureName, parameters, transaction, commandType: CommandType.StoredProcedure);
                }

                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error executing batch stored procedures: {ex.Message}", ex);
            }
        }
    }
}
