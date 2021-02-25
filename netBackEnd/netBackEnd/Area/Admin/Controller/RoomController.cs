using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using netBackEnd.Common;
using netBackEnd.Models;
using netBackEnd.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace netBackEnd.Area.Admin
{
    [Area("Admin")]
    [Route("admin/room")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private RoomService room = new RoomService();
        [HttpPost("create")]
        public IActionResult create([FromBody] UserID attendants)
        {

            var result = room.createRoom(attendants.idOne, attendants.idTwo);

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

        [HttpGet("get")]
        public IActionResult getAll()
        {

            //var rng = new Random();
            //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            //{
            //    Date = DateTime.Now.AddDays(index),
            //    TemperatureC = rng.Next(-20, 55),
            //    Summary = Summaries[rng.Next(Summaries.Length)]
            //})
            //.ToArray();
            var list = room.getAllAsync();
            var data = CreateData.create(0, list.Result, "Success");
            return Ok(data);
        }

        [HttpPost("list")]
        public IActionResult getList([FromBody]UserID id)
        {

            //.ToArray();
            var list = room.getRoomListAsync(id.id);
            var data = CreateData.create(0, list.Result, "Success");
            return Ok(data);
        }
    }
}
