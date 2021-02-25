using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using netBackEnd.Models;
namespace netBackEnd.Services
{
    public class ChatServices
    {
        private Connection db = new Connection();

        public bool createRole(Chat newChat)
        {

            try
            {

                var collection = db.getChatCollectionAsync();
                collection.InsertOneAsync(newChat);
                return true;

            }
            catch (Exception)
            {

                return false;
            }

        }

        public IEnumerable<Chat> getByRoom(string id, int skip, int limit)
        {
            var collection = db.getChatCollectionAsync();
            var query = collection.Find(s=>s.Id.ToString() == id).ToList().OrderByDescending(s=>s.CreatedOn).Skip(skip).Take(limit);

            return query;
        }


    }
}
