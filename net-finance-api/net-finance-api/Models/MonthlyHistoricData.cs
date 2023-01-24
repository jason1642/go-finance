using System;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace net_finance_api.Models;



public class MetaData
{
    [BsonElement("1. Information")]
    [JsonPropertyName("1. Information")]
    public string? Information { get; set; }

    [BsonElement("2. Symbol")]
    [JsonPropertyName("2. Symbol")]
    public string?  Symbol { get; set; }

    [BsonElement("3. Last Refreshed")]
    [JsonPropertyName("3. Last Refreshed")]
    public string? LastRefreshed { get; set; }

    [BsonElement("4. Time Zone")]
    [JsonPropertyName("4. Time Zone")]
    public string? TimeZone { get; set; }
}



public class MonthlyTimeSeries
{
    [BsonElement("1. open")]
    [JsonPropertyName("1. open")]
    public string? Open { get; set; }

    [BsonElement("2. open")]
    [JsonPropertyName("2. open")]
    public string? Open { get; set; }

    [BsonElement("3. open")]
    [JsonPropertyName("3. open")]
    public string? Open { get; set; }

    [BsonElement("4. open")]
    [JsonPropertyName("4. open")]
    public string? Open { get; set; }

}



public class MonthlyHistoricData
{
	public MonthlyHistoricData()
	{

	}

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? _id { get; set; }

    [BsonElement("Meta Data")]
    [JsonPropertyName("Meta Data")]
    public MetaData? MetaData { get; set; }

    [BsonElement("Monthly Time Series")]
    [JsonPropertyName("Monthly Time Series")]
    public MonthlyTimeSeries? MonthlyTimeSeries { get; set; }
}


