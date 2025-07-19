using Domain.Interfaces.RepositoryInterfaces;
using Domain.Interfaces.SPCallInterfaces;
using Domain.Interfaces.UnitOfWorkInterfaces;
using Domain.Interfaces.UtilityInterfaces.FileHandlerInterfaces;
using Domain.Interfaces.UtilityInterfaces.MimeTypesInterfaces;
using Infrastructure.Data;
using Infrastructure.Repository.UserRepository;
using Infrastructure.StoredProcedureCall;
using Infrastructure.UnitOfWorkImplementation;
using Infrastructure.Utility.Authentication;
using Infrastructure.Utility.FileHandler;
using Infrastructure.Utility.MimeTypes;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Infrastructure;

public static class InfrastructureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Register DbContext with MySQL
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseMySql(
                DbConnection.DefaultConnection,
                ServerVersion.AutoDetect(DbConnection.DefaultConnection)
            );
        });

        // Register unit of work and stored procedure handler
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<ISPCall, SPCall>();

        // Register repositories
        services.AddScoped<IYallaOutingUserRepository, YallaOutingUserRepository>();

        // Register file mime type services
        services.AddSingleton<IMimeTypesLoader>(new FileMimeTypesLoader("MimeTypes.json"));
        services.AddSingleton<IMimeTypesService, MimeTypes>();

        // Register file handler
        services.AddScoped<IFileHandler, FileHandler>();

        // JWT Settings binding
        var jwtSettingsSection = configuration.GetSection("JwtSettings");
        services.Configure<JwtSettings>(jwtSettingsSection);

        var jwtSettings = jwtSettingsSection.Get<JwtSettings>();
        var key = Encoding.ASCII.GetBytes(jwtSettings.Key);

        services
            .AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings.Issuer,

                    ValidateAudience = true,
                    ValidAudience = jwtSettings.Audience,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),

                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        return services;
    }
}
