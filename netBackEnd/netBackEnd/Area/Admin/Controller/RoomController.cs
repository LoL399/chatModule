using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using netBackEnd.Common;
using netBackEnd.Models;
using netBackEnd.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace netBackEnd.Area.Admin
{
    [Authorize]
    [Area("Admin")]
    [Route("admin/room")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IJWTAuthencation jWTAuthencation;
        private RoomService room = new RoomService();

        public RoomController(IJWTAuthencation jWTAuthencation)
        {
            this.jWTAuthencation = jWTAuthencation;
        }

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
        [HttpGet("get/{id}")]
        public IActionResult getOne(string id)
        {
            var list = room.getOneAsync(id);
            var data = CreateData.create(0, list.Result, "Success");
            return Ok(data);
        }

        [HttpGet("list")]
        public IActionResult getList()
        {
            var accessToken = Request.Headers[HeaderNames.Authorization].ToString().Split("Bearer ");

            var user = jWTAuthencation.decodeToken(accessToken[1]);

            //.ToArray();
            var list = room.getRoomListAsync(user);
            var data = CreateData.create(0, list.Result, "Success");
            return Ok(data);
        }
    }
}
