using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace netBackEnd.Models
{
    [BsonIgnoreExtraElements]
    public class Roles
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("updatedAt")]
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
        [BsonElement("createdAt")]
        public DateTime CreatedOn { get; set; } = DateTime.Now;




    }
}
