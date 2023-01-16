using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



namespace net_finance_api.Models;

public class Users
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }

    [BsonElement("Name")]
    [JsonPropertyName("username")]

    public string? username { get; set; }
    public string? password { get; set; }
    public bool IsComplete { get; set; }
    public string? Secret { get; set; }
}