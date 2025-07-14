using Domain.Results;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Domain.Wrappers
{
    public static class PaginationBuilder
    {
        private const int MaxPageSize = 1000; // Limit page size to a reasonable upper limit.

        public static async Task<OperationResultPaginated<T>> ToPaginatedListAsync<T>(this IQueryable<T> source, int pageNumber, int pageSize) where T : class
        {
            if (pageNumber <= 0)
                throw new ArgumentOutOfRangeException(nameof(pageNumber), "Page number must be greater than zero.");

            pageSize = Math.Min(Math.Max(10, pageSize), MaxPageSize);

            if (source == null)
                throw new ArgumentNullException(nameof(source), "The queryable source cannot be null.");

            int totalItemCount = await source.AsNoTracking().CountAsync();

            if (totalItemCount == 0)
                return SuccessPaginated(new List<T>(), totalItemCount, pageNumber, pageSize);

            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return SuccessPaginated(items, totalItemCount, pageNumber, pageSize);
        }

        private static OperationResultPaginated<T> SuccessPaginated<T>(IEnumerable<T> data, int totalCount, int currentPage, int pageSize, string message = "")
        {
            var dataList = data.ToList();
            return new OperationResultPaginated<T>()
            {
                Data = dataList,
                CurrentPage = currentPage,
                TotalCount = totalCount,
                PageSize = pageSize,
                Message = message,
                Succeeded = true,
                StatusCode = HttpStatusCode.OK,
            };
        }
    }
}

