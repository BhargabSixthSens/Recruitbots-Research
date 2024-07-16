const express = require('express');
const router = express.Router();
const fs = require('fs');

// const outputFilePath = 'output.webm';
// let writeStream = fs.createWriteStream(outputFilePath, { flags: 'a' });


router.ws('/echo', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
        ws.send(msg);
    });
});

router.ws('/audio', function (ws, req) {
    ws.on('message', (msg) => {
        console.log('Received message:', msg);
        // writeStream.write(msg);
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
        // writeStream.end();
    });

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
        // writeStream.end();
    });
});

router.ws('/video', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
        ws.send(msg);
    });
});

exports.websocketRouter = router;
