using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace netBackEnd.Common
{
    public class CreateChat
    {
        public string Room;
        public string Content;
        public string FromUser;



        public CreateChat(string room, string content, string fromuser) {
            Room = room;
            Content = content;
            FromUser = fromuser;

        }
    }
}
