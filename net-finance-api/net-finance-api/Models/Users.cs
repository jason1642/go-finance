using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



namespace net_finance_api.Models;

public class Users
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Name")]
    [JsonPropertyName("Name")]

    public string? Name { get; set; }
    public string? Password { get; set; }
    public bool IsComplete { get; set; }
    public string? Secret { get; set; }
}