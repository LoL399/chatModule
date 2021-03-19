using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using netBackEnd.Common;
using netBackEnd.Models;
namespace netBackEnd.Services
{
    public class ChatServices
    {
        private Connection db = new Connection();

        public async Task<Chat> createChat(Chat newChat)
        {

            try
            {
                var collection = db.getChatCollectionAsync();
                collection.InsertOne(newChat);
                var id = newChat.Id;
                var result = await getOneAsync(id.ToString());


                return result;

            }
            catch (Exception)
            {

                return null;
            }

        }

        public IEnumerable<Chat> getByRoom(getChat request)
        {
            var collection = db.getChatCollectionAsync();
            var query = collection.Find(s=>s.UserRoom == ObjectId.Parse(request.room)).ToList().OrderByDescending(s=>s.CreatedOn).Skip(int.Parse(request.skip)).Take(int.Parse(request.limit)).Reverse();
            return query;
        }

        public async Task<Chat> getOneAsync(String id)
        {

            var Collection = db.getChatCollectionAsync();
            var chat = await Collection.Find(s => s.Id == ObjectId.Parse(id)).SingleAsync();
            return chat;
        }


    }
}
