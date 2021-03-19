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
    [Area("Admin")]
    [Route("admin/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserServices user = new UserServices();

        private readonly IJWTAuthencation jWTAuthencation;


        public UserController(IJWTAuthencation jWTAuthencation)
        {
            this.jWTAuthencation = jWTAuthencation;
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
            var list = user.getAllAsync();
            var data = CreateData.create(0, list, "Success");
            return Ok(data);
        }

        [HttpGet("get/{id}")]
        public IActionResult getOne(string id)
        {

            //var rng = new Random();
            //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            //{
            //    Date = DateTime.Now.AddDays(index),
            //    TemperatureC = rng.Next(-20, 55),
            //    Summary = Summaries[rng.Next(Summaries.Length)]
            //})
            //.ToArray();
            var list = user.getOneAsync(id);
            var data = CreateData.create(0, list, "Success");
            return Ok(data);
        }

        [HttpGet("get/info")]
        public IActionResult getInfo()
        {
            var accessToken = Request.Headers[HeaderNames.Authorization].ToString().Split("Bearer ");
            var id = jWTAuthencation.decodeToken(accessToken[1]);
            var list = user.getOneAsync(id);
            var data = CreateData.create(0, list, "Success");
            return Ok(data);
        }

        [HttpPost("create")]
        public IActionResult createUser([FromBody]Users newUser) {

            var result = user.createUser(newUser);

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

