using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class ApplicationAuthenticationExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configs)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configs["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            return services;

        }
        
    }
}