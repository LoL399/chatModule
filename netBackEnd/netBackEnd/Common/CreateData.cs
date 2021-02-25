using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace netBackEnd.Common
{
    public class CreateData
    {
        public static object create(int errCode, object data, string message)
        {
            return new { err = errCode, data = data, message = message };

        }
    }
}
