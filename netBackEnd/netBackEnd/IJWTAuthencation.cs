using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace netBackEnd
{
    public interface IJWTAuthencation
    {
        string Authenticate(string userID);

        string decodeToken(string token);

    }
}
