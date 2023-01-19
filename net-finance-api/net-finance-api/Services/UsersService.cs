﻿using net_finance_api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using static System.Runtime.InteropServices.JavaScript.JSType;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NetFinanceApi.Services;

public class UsersService
{
    private readonly IMongoCollection<Users> _usersCollection;


    public UsersService(
        IOptions<NetFinanceDatabaseSettings> netFinanceDatabaseSettings)
    {
        System.Diagnostics.Debug.WriteLine(netFinanceDatabaseSettings);

        var mongoClient = new MongoClient(
            netFinanceDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            netFinanceDatabaseSettings.Value.DatabaseName);

        _usersCollection = mongoDatabase.GetCollection<Users>(
            netFinanceDatabaseSettings.Value.UsersCollectionName);
    }

    public async Task<List<Users>> GetAsync() =>
        await _usersCollection.Find(_ => true).ToListAsync();

    public async Task<Users?> GetAsync(string id) =>
        await _usersCollection.Find(x => x._id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Users newUser) =>
        await _usersCollection.InsertOneAsync(newUser);


    public async Task UpdateAsync(string id, Users updatedUser) =>
        await _usersCollection.ReplaceOneAsync(x => x._id == id, updatedUser);

    public async Task RemoveAsync(string id) =>
        await _usersCollection.DeleteOneAsync(x => x._id == id);





    public async Task<Users?> Login(Users user)
    {
        Users matchingUser = await _usersCollection.Find(x => x.username == user.username).FirstOrDefaultAsync();
        bool isValidPassword = BCrypt.Net.BCrypt.Verify(user.password, matchingUser.password);
        if (isValidPassword)
        {
            return matchingUser;
        }
        return null;
    }
        
    public async Task<Users?> Verify()
    {
        return null;
    }

}