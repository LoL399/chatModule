using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;


namespace netBackEnd.Models
{
    [BsonIgnoreExtraElements]
    public class Chat
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }


        [BsonElement("content")]
        public string Content { get; set; }
        [BsonElement("replyTo")]
        public ObjectId ReplyTo { get; set; }
        [BsonElement("fromUser")]
        public ObjectId FromUser { get; set; }
        [BsonElement("UserRoom")]
        public ObjectId UserRoom { get; set; }



        [BsonElement("updatedAt")]
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
        [BsonElement("createdAt")]
        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}
