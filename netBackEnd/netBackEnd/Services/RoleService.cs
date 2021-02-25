using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MongoDB.Driver;
using netBackEnd.Models;

namespace netBackEnd.Services
{
    public class RoleService
    {
        private Connection db = new Connection();

        public bool createRole(Roles newRole)
        {

            try
            {

                var collection = db.getRoleCollectionAsync();
                collection.InsertOneAsync(newRole);
                return true;

            }
            catch (Exception)
            {

                return false;
            }

        }

        public async Task<IEnumerable<Roles>> getAllAsync()
        {

            var uCollection = db.getRoleCollectionAsync();
            var list = await uCollection.Find(s => true).ToListAsync();

            return list;
        }

        public async Task<Roles> getOneAsync(string id)
        {

            var rCollection = db.getRoleCollectionAsync();
            var role = await rCollection.Find(s => s.Id.ToString() == id).SingleAsync();
            return role;
        }



    }
}
