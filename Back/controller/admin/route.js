const user = require("../../database/controllers/userController")
const role = require("../../database/controllers/roleController")
const request = require("../../database/controllers/resquestController")
const chat = require("../../database/controllers/chatController");
const room = require("../../database/controllers/roomController");

const router = require("express").Router();
// route user
router.get("/user/get", user.getAll);
router.get("/user/get/:id", user.getOne);
router.post("/user/create", user.create);


// role
router.get("/role/get", role.getAll);
router.post("/role/create", role.create);

//request
router.post("/request/get", request.getAll);
router.get("/request/get/:id", request.getOne);
router.post("/request/create", request.create);
router.put("/request/update/:id", request.updateRequest);

//room
router.post("/room/create", room.create)
router.post("/room/hidden", room.changeRoomStatus)
router.post("/room", room.getRoomList)
router.get("/room/get", room.getAll)
router.put("/room/attend", room.attendRoom)

//chat (Fuck this)
router.post("/chat/get", chat.getAll);
router.post("/chat/:id", chat.getbyRoom);
// router.get("/chat/get/:id", chat.getOne);
router.post("/chat/create", chat.create);
// router.get("/chat", chat.getRoomList);









module.exports = router;
