using Microsoft.EntityFrameworkCore;
using net_finance_api.Models;
using NetFinanceApi.Services;

var policyName = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName,
                      builder =>
                      {
                          builder
                             //.WithOrigins("http://localhost:3000")
                             .AllowAnyOrigin()
                             .AllowAnyMethod()
                             .AllowAnyHeader();
                             //.AllowCredentials();
                      });
});


builder.Services.AddControllers();
//builder.Services.AddDbContext<UserContext>(opt =>
//    opt.UseInMemoryDatabase("net_finance_api"));

builder.Services.Configure<NetFinanceDatabaseSettings>(
    builder.Configuration.GetSection("NetFinanceDatabase"));

builder.Services.AddSingleton<UsersService>();

builder.Services.AddControllers()
    .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors(policyName);

app.UseAuthorization();

app.MapControllers();

app.Run();

