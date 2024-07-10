const { zoomService } = require('../services/zoom');

const router = require('express').Router();

router.get('/token/:meetingId', async (req, res) => {
    const meetingNumber = req.params.meetingId;
    if (!meetingNumber) {
        return res.status(400).json({ message: 'Meeting Id missing' })
    }
    const token = zoomService.createToken(meetingNumber);
    return res.json({ message: "Zoom Meeting Token Fetched", token })
})

exports.zoomRouter = router;