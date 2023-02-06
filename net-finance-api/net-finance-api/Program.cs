using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using net_finance_api.Models;
using net_finance_api.Controllers;
using NetFinanceApi.Services;
using System.Security.Claims;
using System.Text;


// var policyName = "_myAllowSpecificOrigins";
var policyName = "LowCorsPolicy";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName,
        builder =>
        {
            builder
                // .WithOrigins("https://localhost:5172", "https://dtg1w6c05xnaz.cloudfront.net", "http://localhost:5172", "https://localhost:3001", "https://main.d1pbrktrl7a0d8.amplifyapp.com", "https://localhost:7025")
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});


builder.Services.AddControllers(); 
//builder.Services.AddDbContext<UserContext>(opt =>
//    opt.UseInMemoryDatabase("net_finance_api"));

builder.Services.Configure<NetFinanceDatabaseSettings>(
    builder.Configuration.GetSection("NetFinanceDatabase"));

builder.Services.AddSingleton<UsersService>();
builder.Services.AddSingleton<MonthlyHistoricDataService>();
builder.Services.AddSingleton<DailyHistoricDataService>();



builder.Services.AddControllers()
    .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();






//builder.Services.AddAuthentication("Bearer").AddJwtBearer();

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,

        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
    options.Events = new JwtBearerEvents();

    options.Events.OnMessageReceived = context =>
    {

        if (context.Request.Cookies.ContainsKey("X-Access-Token"))
        {
            context.Token = context.Request.Cookies["X-Access-Token"];
        }
        return Task.CompletedTask;
    };
}).AddCookie("Cookies", options =>
{

    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.IsEssential = true;
    //options.LoginPath = "/login";
    options.ExpireTimeSpan = TimeSpan.FromDays(1);
    // this is the key piece!

});
Console.WriteLine("Hello World!");

//.AddPolicyScheme("JWT_OR_COOKIE", "JWT_OR_COOKIE", options =>
//{
//    // runs on each request
//    options.ForwardDefaultSelector = context =>
//    {
//        // filter by auth type
//        string authorization = context.Request.Headers[HeaderNames.Authorization];
//        if (!string.IsNullOrEmpty(authorization) && authorization.StartsWith("Bearer "))
//            return "Bearer";

//        // otherwise always check for cookie auth
//        return "Cookies";
//    };
//});






var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors(policyName);


app.MapControllers();

app.Run();

