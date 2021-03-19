using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using netBackEnd.Services;
using MongoDB.Driver;
using netBackEnd.Models;
using MongoDB.Bson;

namespace netBackEnd.Services
{
    public class UserServices
    {
        private Connection db = new Connection();

        public bool createUser(Users newUser)
        {

            try
            {

                var uCollection = db.getUserCollectionAsync();
                uCollection.InsertOneAsync(newUser);
                return true;

            }
            catch (Exception)
            {

                return false;
            }

        }

        public IQueryable getAllAsync()
        {
            var uCollection = db.getUserCollectionAsync();
            var rCollection = db.getRoleCollectionAsync();
            var query = from p in uCollection.AsQueryable()
                        join o in rCollection.AsQueryable() on p.Role equals o.Id
                        select new
                        {
                            p.Id,
                            p.Name,
                            Role = o.Name,
                            p.CreatedOn
                           
                        };
            //var list = await uCollection.Find(s => true).ToListAsync();

            return query;
        }

        public Users getAttendants(string id)
        {
            var uCollection = db.getUserCollectionAsync();
            var user = uCollection.Find(s => s.Id == ObjectId.Parse(id)).FirstOrDefault();

            return user;

        }

        public IQueryable getOneAsync(string id)
        {
            var uCollection = db.getUserCollectionAsync();
            var rCollection = db.getRoleCollectionAsync();


            var query = from p in uCollection.AsQueryable()
                        join o in rCollection.AsQueryable() on p.Role equals o.Id where p.Id ==  ObjectId.Parse(id)
                        select new
                        {
                            p.Id,
                            p.Name,
                            Role = o.Name,
                            p.CreatedOn

                        };
            //var list = await uCollection.Find(s => true).ToListAsync();
            if (query.Any())
            {
                return query;

            }
            else
            {
                return null;
            }

        }




    }
}
