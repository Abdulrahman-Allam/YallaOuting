namespace Application.Helpers
{
    namespace Domain.Helpers
    {
        public static class PaginationHelper
        {
            public static int CalculateTotalPages(int totalCount, int pageSize)
            {
                return (int)Math.Ceiling(totalCount / (double)pageSize);
            }
            public static bool HasPreviousPage(int? currentPage)
            {
                return currentPage > 1;
            }
            public static bool HasNextPage(int? currentPage, int? totalPages)
            {
                return currentPage < totalPages;
            }
        }
    }

}
