using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace netBackEnd.Models
{
    [BsonIgnoreExtraElements]
    public class Rooms
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        [BsonElement("lastSeenChat")]
        public ObjectId LastSeenChat { get; set; }
        [BsonElement("hidden")]
        public Boolean Hidden { get; set; }
        [BsonElement("attendants")]
        public List<ObjectId> Attendants { get; set; }


        [BsonElement("updatedAt")]
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
        [BsonElement("createdAt")]
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        public Rooms( string[] attendants) {

            Hidden = false;
            foreach (string x in attendants) {
                this.Attendants.Add(ObjectId.Parse(x));
            }
            
        }


    }
}