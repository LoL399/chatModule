const request = require("../../database/controllers/resquestController")
const chat = require("../../database/controllers/chatController")
const room = require("../../database/controllers/roomController");
const router = require("express").Router();

router.get("/request/get", request.getAll);
router.get("/request/get/:id", request.getOne);
router.post("/reques/create", request.create);


//chat (Fuck this)
router.get("/chat/get", chat.getAll);
router.post("/chat/:id", chat.getbyRoom);
// router.get("/chat/get/:id", chat.getOne);
router.post("/chat/create", chat.create);
// router.get("/chat", chat.getRoomList);

router.post("/room/create", room.createbyUser)
router.post("/room/getRoom", room.getRoomByUser)
router.post("/room/hidden", room.changeRoomStatus)


module.exports = router;
