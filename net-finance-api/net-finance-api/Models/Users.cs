using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


       
namespace net_finance_api.Models;


public partial class Positons : IEmbeddedObject
{
    [MapTo("symbol")]
    public string symbol { get; set; }

    [MapTo("average_price")]
    public int average_price { get; set; }

    [MapTo("total_value")]
    public int total_value { get; set; }

    [MapTo("type")]
    public string type { get; set; }

    [MapTo("sector")]
    public string sector { get; set; }
}


public partial class Portfolio : IEmbeddedObject
{
    [MapTo("account_value")]
    public number account_value { get: set; }


    [MapTo("positions")]
    public IList<Positions> positions { get; }
}



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


    [MapTo("portfolio")]
    public IList<Portfolio> portfolio { get; }




}