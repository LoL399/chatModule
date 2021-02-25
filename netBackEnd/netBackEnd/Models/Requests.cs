using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace netBackEnd.Models
{
    [BsonIgnoreExtraElements]
    public class Requests
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("problem")]
        public string Problem { get; set; }

        [BsonElement("status")]
        public int Status { get; set; }
        [BsonElement("byUser")]
        public ObjectId byUser { get; set; }
        [BsonElement("room")]
        public ObjectId Room { get; set; }

        [BsonElement("handleBy")]
        public ObjectId handleBy { get; set; }
        [BsonElement("isTaken")]
        public ObjectId isTaken { get; set; }
        [BsonElement("updatedAt")]
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
        [BsonElement("createdAt")]
        public DateTime CreatedOn { get; set; } = DateTime.Now;


        public Requests(string problem, string byUser, string room, string handleBy ) {
            Problem = problem;
            this.byUser = ObjectId.Parse(byUser);
            Room = ObjectId.Parse(room);
            this.handleBy = ObjectId.Parse(handleBy);
            Status = 0;

        }


    }
}
