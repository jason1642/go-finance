using net_finance_api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using static System.Runtime.InteropServices.JavaScript.JSType;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Azure;
using Azure.Core;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace NetFinanceApi.Services;

public class DailyHistoricDataService
{
    private readonly IMongoCollection<DailyHistoricData> _DailyHistoricDataCollection;


    public DailyHistoricDataService(
        IOptions<NetFinanceDatabaseSettings> netFinanceDatabaseSettings)
    {
        System.Diagnostics.Debug.WriteLine(netFinanceDatabaseSettings);

        var mongoClient = new MongoClient(
            netFinanceDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            netFinanceDatabaseSettings.Value.DatabaseName);

        _DailyHistoricDataCollection = mongoDatabase.GetCollection<DailyHistoricData>(
            netFinanceDatabaseSettings.Value.DailyHistoricDataCollectionName);
    }

    public async Task<List<DailyHistoricData>> GetAsync() =>
        await _DailyHistoricDataCollection.Find(_ => true).ToListAsync();

    public async Task<DailyHistoricData?> GetAsync(string symbol) =>
        await _DailyHistoricDataCollection.Find(x => x.symbol == symbol).FirstOrDefaultAsync();

    //public async Task<Users?> GetAsyncEmail(string email) =>
    //await _DailyHistoricDataCollection.Find(x => x.email == email).FirstOrDefaultAsync();


    //public async Task<Users?> GetAsyncUsername(string username) =>
    //await _DailyHistoricDataCollection.Find(x => x.username == username).FirstOrDefaultAsync();


    public async Task CreateAsync(DailyHistoricData newItem) =>
        await _DailyHistoricDataCollection.InsertOneAsync(newItem);


    public async Task UpdateAsync(string id, DailyHistoricData updatedItem) =>
        await _DailyHistoricDataCollection.ReplaceOneAsync(x => x._id == id, updatedItem);

    //public async Task RemoveAsync(string id) =>
    //    await _DailyHistoricDataCollection.DeleteOneAsync(x => x._id == id);

    //public async Task<Users?> verifyToken(string username, string cookie_token) =>
    //    await _DailyHistoricDataCollection.Find(i => i.username == username && i.refresh_token == cookie_token).FirstOrDefaultAsync();



    //public async Task<Users?> Login(Users user)
    //{
    //    Users matchingUser = await _usersCollection.Find(x => x.username == user.username).FirstOrDefaultAsync();
    //    bool isValidPassword = BCrypt.Net.BCrypt.Verify(user.password, matchingUser.password);
    //    if (isValidPassword)
    //    {
    //        return matchingUser;
    //    }
    //    return null;
    //}



}