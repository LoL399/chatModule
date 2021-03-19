using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using netBackEnd.Common;
using netBackEnd.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace netBackEnd.Area.Common
{
    [Route("login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private UserServices userService = new UserServices();
        private readonly IJWTAuthencation jWTAuthencation;

        public LoginController(IJWTAuthencation jWTAuthencation)
        {
            this.jWTAuthencation = jWTAuthencation;
        }




        [HttpPost]
        public IActionResult createToken([FromBody] UserID user )
        {
            try
            {
                var checkUser = userService.getOneAsync(user.id);

                var token = jWTAuthencation.Authenticate(user.id);
                if(checkUser != null)
                {
                    var data = CreateData.create(0, token, "Success");
                    return Ok(data);

                }
                else
                {
                    throw new InvalidOperationException("Error");
                }


            }
            catch (Exception e)
            {

                var data = CreateData.create(1, "User not found", "Error");
                return Ok(data);
            }


        }
    }
}
