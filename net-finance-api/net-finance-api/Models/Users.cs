using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



namespace net_finance_api.Models;

public class Users
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }

    [BsonElement("username")]
    [JsonPropertyName("username")]

    public string? username { get; set; }

    [BsonElement("password")]
    [JsonPropertyName("password")]
    public string? password { get; set; }
   
}