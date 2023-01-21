using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


       
namespace net_finance_api.Models;


private partial class Positons : IEmbeddedObject
{
    [MapTo("symbol")]
    [BsonElement("symbol")]
    public string symbol { get; set; }

    [MapTo("average_price")]
    [BsonElement("average_price")]
    public int average_price { get; set; }

    [MapTo("total_value")]
    [BsonElement("total_value")]
    public int total_value { get; set; }

    [MapTo("type")]
    [BsonElement("type")]ß
    public string type { get; set; }
    // stock, call, put, spread, etc

    [MapTo("sector")]
    [BsonElement("sector")]
    public string sector { get; set; }
}


private partial class Portfolio : IEmbeddedObject
{
    [MapTo("account_value")]
    [BsonElement("account_value")]
    public number account_value { get; set; }

     

    [MapTo("positions")]
    [BsonElement("positions")]
    public Positions[] positions { get; set;}
}


private partial class OrderHistory : IEmbeddedObject
{
    [MapTo("symbol")]
    [BsonElement("symbol")]
    public string symbol { get; set; }

    [MapTo("price")]
    [BsonElement("price")]
    public int price { get; set; }

    [MapTo("action")]
    [BsonElement("action")]
    public string action { get; set; }

    [MapTo("quantity")]
    [BsonElement("quantity")]
    public int quantity { get; set; }

    [MapTo("status")]
    [BsonElement("status")]
    public string status { get; set; }




}



public class Users
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? _id { get; set; }

    [BsonElement("username")]
    [JsonPropertyName("username")]

    public string? username { get; set; }


    [BsonElement("email")]
    [JsonPropertyName("email")]

    public string? email { get; set; }

    [BsonElement("password")]
    [JsonPropertyName("password")]
    public string? password { get; set; }

    public string? refresh_token { get; internal set; }


    [MapTo("portfolio")]
    public IList<Portfolio> portfolio { get; }


    [MapTo("order_history")]
    [BsonElement("order_history")]
    public OrderHistory[] order_history { get; set; }




    }