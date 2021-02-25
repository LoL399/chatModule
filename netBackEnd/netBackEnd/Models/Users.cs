using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace netBackEnd.Models
{
    [BsonIgnoreExtraElements]
    public class Users
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }
        [BsonElement("role")]
        public ObjectId Role { get; set; }
        [BsonElement("updatedAt")]
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
        [BsonElement("createdAt")]
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        public Users(string name, string email, string role) {
            Name = name;
            Email = email;
            Role = ObjectId.Parse(role);
        }


    }
}
