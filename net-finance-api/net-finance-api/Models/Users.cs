using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



namespace net_finance_api.Models;

public class Users
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? _id { get; set; }

    [BsonElement("username")]
    [JsonPropertyName("username")]

    public string? username { get; set; }

    [BsonElement("password")]
    [JsonPropertyName("password")]
    public string? password { get; set; }

    public string? refresh_token { get; internal set; }
}