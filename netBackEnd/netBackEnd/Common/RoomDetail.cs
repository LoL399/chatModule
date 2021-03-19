using netBackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace netBackEnd.Common
{
    public class RoomDetail
    {
        public string ID;
        public List<Users> Attendants;
        public bool Hidden;

        public RoomDetail(string id, List<Users> attendants)
        {
            ID = id;
            Attendants = attendants;
            Hidden = false;
        }

    }


}
