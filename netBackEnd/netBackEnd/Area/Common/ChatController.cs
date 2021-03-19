using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;
using netBackEnd.Common;
using netBackEnd.HubConfig;
using netBackEnd.Models;
using netBackEnd.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace netBackEnd.Area.Common
{
    [Authorize]
    [Route("chat")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hub;

        ChatServices chat = new ChatServices();


        private readonly IJWTAuthencation jWTAuthencation;



        public ChatController(IHubContext<ChatHub> hub, IJWTAuthencation jWTAuthencation) 
        {
            _hub = hub;
            this.jWTAuthencation = jWTAuthencation;
        }


        [HttpPost("getbyId")]
        public IActionResult getById([FromBody] UserID getChat)
        {
            var list = chat.getOneAsync(getChat.id);
            var data = CreateData.create(0, list, "Success");
            return Ok(data);

        }



        [HttpPost("room")]
        public IActionResult getByRoom([FromBody] getChat room)
        {
            var list = chat.getByRoom(room);
            var data = CreateData.create(0, list, "Success");
            return Ok(data);

        }

        [AllowAnonymous]
        [HttpGet("get")]
        public IActionResult Get() {

            var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("Test", "Hi"));

            return Ok(new { Message = "Completed" });
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public IActionResult sendMess([FromBody] CreateChat newChat) {


            var accessToken = Request.Headers[HeaderNames.Authorization].ToString().Split("Bearer ");

            var user = jWTAuthencation.decodeToken(accessToken[1]);
            var createChat = new Chat(newChat.Room, newChat.Content, user);
            var result = chat.createChat(createChat);
            _hub.Clients.All.SendAsync(newChat.Room.ToString(), createChat.Id.ToString());
            return Ok(new { Message = "Completed" });
        }
    }
}
