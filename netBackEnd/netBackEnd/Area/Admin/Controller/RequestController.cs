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
    [Route("admin/request")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private RequestService request = new RequestService();
        [HttpPost("create")]
        public IActionResult createUser([FromBody] Requests newRequest)
        {

            var result = request.createRequest(newRequest);

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

        [HttpPost("get")]
        public IActionResult getAll([FromBody]string id )
        {
            var list = request.getAll(id);
            var data = CreateData.create(0, list, "Success");
            return Ok(data);
        }

        [HttpPut("update/{:id}")]
        public IActionResult updateRequest(string id, [FromBody] int status, string handler)
        {

            var result = request.updateRequest(id,status,handler);
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
