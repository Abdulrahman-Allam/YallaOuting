using Domain.Interfaces.UnitOfWorkInterfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.UnitOfWorkImplementation
{
    public partial class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private bool _disposed;

        private readonly Dictionary<Type, object> _repositories = new();

        public UnitOfWork(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));

            SetUserContext();
        }

        private void SetUserContext()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User?.Claims?.FirstOrDefault()?.Value;
            if (!string.IsNullOrWhiteSpace(userIdClaim))
            {
                _context._userId = userIdClaim;
            }
        }
    }
}
