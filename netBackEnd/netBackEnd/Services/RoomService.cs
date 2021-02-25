using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using netBackEnd.Models;

namespace netBackEnd.Services
{
    public class RoomService
    {
        private Connection db = new Connection();

        public bool createRoom(string idOne, string idTwo)
        {

            try
            {
                string[] attendants = { idOne, idTwo };
                Rooms newRoom = new Rooms(attendants);

                var collection = db.getRoomCollectionAsync();
                collection.InsertOneAsync(newRoom);
                return true;

            }
            catch (Exception)
            {

                return false;
            }

        }

        public async Task<IEnumerable<Rooms>> getAllAsync()
        {

            var uCollection = db.getRoomCollectionAsync();
            var list = await uCollection.Find(s => true).ToListAsync();

            return list;
        }

        public async Task<Rooms> getOneAsync(string id)
        {

            var rCollection = db.getRoomCollectionAsync();
            var room = await rCollection.Find(s => s.Id.ToString() == id).SingleAsync();
            return room;
        }

        public async Task<IEnumerable<Rooms>> getRoomListAsync(string id)
        {

            var uCollection = db.getRoomCollectionAsync();
            var filter = Builders<Rooms>.Filter.AnyEq(x => x.Attendants, ObjectId.Parse(id));
            var list = await uCollection.Find(filter).ToListAsync();

            return list;
        }
    }
}
