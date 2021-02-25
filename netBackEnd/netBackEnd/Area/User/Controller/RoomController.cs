using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using netBackEnd.Common;
using netBackEnd.Models;
using netBackEnd.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace netBackEnd.Area.User
{
    [Area("User")]
    [Route("user/room")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private RoomService room = new RoomService();

        [HttpPost("create")]
        public IActionResult create([FromBody] UserID id)
        {

            var result = room.createRoom(id.id, "600beac1a0d77f29b40678f2");

            if (result)
            {
                var data = CreateData.create(0, null, "Success");
                return Ok(data);
            }
            else
            {
                var data = CreateData.create(1, null, "Error");
                return Ok(data);
            }


        }
    }
}
