using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using netBackEnd.Models;


namespace netBackEnd.Services
{
    public class RequestService
    {
        private Connection db = new Connection();

        public bool createRequest(Requests newRequest)
        {

            try
            {

                var collection = db.getRequetsCollectionAsync();
                collection.InsertOneAsync(newRequest);
                return true;

            }
            catch (Exception)
            {

                return false;
            }

        }

        public IQueryable getAll(string id)
        {
            var role = new RoleService().getOneAsync(id);
            var uCollection = db.getUserCollectionAsync();
            var rCollection = db.getRequetsCollectionAsync();

            if (role.Result.Name == "Master")
            {

                var query = from u in uCollection.AsQueryable()
                            join r in rCollection.AsQueryable() on u.Id equals r.byUser
                            select new
                            {
                                r,
                                u.Name
                            };
                return query;
            }
            else
            {
                var query = from u in uCollection.AsQueryable()
                            join r in rCollection.AsQueryable() on u.Id equals r.byUser
                            where r.byUser.ToString() == id
                            select new
                            {
                                r,
                                u.Name
                            };
                return query;
            }
        }



        public IQueryable getOne(string id)
        {
            var role = new RoleService().getOneAsync(id);
            var uCollection = db.getUserCollectionAsync();
            var rCollection = db.getRequetsCollectionAsync();

            var query = from u in uCollection.AsQueryable()
                        join r in rCollection.AsQueryable() on u.Id equals r.byUser
                        where r.Id.ToString() == id
                        select new
                        {
                            r,
                            u.Name
                        };
            return query;
        }

        public bool updateRequest(string id , int status, string handler)
        {
            try
            {
                var rCollection = db.getRequetsCollectionAsync();

                var request = rCollection.Find(s => s.Id == ObjectId.Parse(id) ).SingleAsync();

                request.Result.Status = status;

                if(status == 1)
                {
                    request.Result.isTaken = ObjectId.Parse(handler);

                }
                else
                {
                    request.Result.isTaken = new ObjectId("");
                }
                var filter = Builders<Requests>.Filter.Eq(s => s.Id.ToString(), id);
                rCollection.ReplaceOneAsync(filter,request.Result);


                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

    }
}
