using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using netBackEnd.Models;
namespace netBackEnd.Services
{
    public sealed class Connection
    {
        private const string mongoConnection = "mongodb+srv://LoL:123456789Loi@cluster0.s5kr3.mongodb.net/Learning?retryWrites=true&w=majority";
        private static IMongoClient client = new MongoClient(mongoConnection);
        private static Connection instance = null;


        public static Connection Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Connection();
                }
                return instance;
            }
        }


        public IMongoCollection<Users> getUserCollectionAsync()
        {
            var database = client.GetDatabase("Learning");
            return database.GetCollection<Users>("users");

        }

        public IMongoCollection<Requests> getRequetsCollectionAsync()
        {
            var database = client.GetDatabase("Learning");
            return database.GetCollection<Requests>("requests");

        }

        public IMongoCollection<Roles> getRoleCollectionAsync()
        {
            var database = client.GetDatabase("Learning");
            return database.GetCollection<Roles>("roles");

        }

        public IMongoCollection<Rooms> getRoomCollectionAsync()
        {
            var database = client.GetDatabase("Learning");
            return database.GetCollection<Rooms>("roomdetails");

        }

        public IMongoCollection<Chat> getChatCollectionAsync()
        {
            var database = client.GetDatabase("Learning");
            return database.GetCollection<Chat>("chatdetails");

        }

    }
}
