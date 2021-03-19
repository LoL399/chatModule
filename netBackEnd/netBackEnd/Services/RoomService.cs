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

        public async Task<RoomDetail> getOneAsync(string id)
        {
            UserServices user = new UserServices();
            var rCollection = db.getRoomCollectionAsync();
            var room = await rCollection.Find(s => s.Id == ObjectId.Parse(id)).SingleAsync();
            List<Users> attList = new List<Users>();

            foreach (var att in room.Attendants)
            {
                var getInfo = user.getAttendants(att.ToString());
                attList.Add(getInfo);
            }
            RoomDetail details = new RoomDetail(room.Id.ToString(), attList);

            return details;
        }

        public async Task<IEnumerable<RoomDetail>> getRoomListAsync(string id)
        {
            UserServices user = new UserServices();
            var uCollection = db.getRoomCollectionAsync();
            var filter = Builders<Rooms>.Filter.AnyEq(x => x.Attendants, ObjectId.Parse(id));
            var list = await uCollection.Find(filter).ToListAsync();

            List < RoomDetail > roomDetail = new List<RoomDetail>();

            foreach (var x in list)
            {
                List<Users> attList = new List<Users>();

                foreach (var att in x.Attendants) 
                {
                    var getInfo = user.getAttendants(att.ToString());
                    attList.Add(getInfo);
                }
                RoomDetail details = new RoomDetail(x.Id.ToString(), attList);
                roomDetail.Add(details);
            }

            return roomDetail;


        }
    }
}
