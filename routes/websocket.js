const express = require('express');
const router = express.Router();

router.ws('/echo', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
        ws.send(msg);
    });
});

router.ws('/audio', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
        ws.send(msg);
    });
});

router.ws('/video', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
        ws.send(msg);
    });
});

exports.websocketRouter = router;
