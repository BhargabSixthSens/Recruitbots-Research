const { chimeService } = require('../services/chime');
const { v4: uuid } = require('uuid');

const router = require('express').Router();

router.get('/meeting/:meetingId', async (req, res) => {
    try {
        const meeting = await chimeService.getMeeting(req.params.meetingId)
        return res.json({ message: "Chime Meeting fetched", data: meeting })
    } catch (e) {
        return res.status(e.statusCode || 500).json(e)
    }

});

router.get('/new-meeting', async (req, res) => {
    const clientRequestToken = uuid();
    const externalMeetingId = uuid();
    const meeting = await chimeService.createMeeting({
        clientRequestToken,
        externalMeetingId
    })
    return res.json({ message: "Chime Meeting Created", data: meeting })
});

router.post('/create-attendee', async (req, res) => {
    try {
        const { meetingId, externalUserId } = req.body;
        const attendee = await chimeService.createAttendee({
            externalUserId,
            meetingId
        })
        return res.json({ message: "Chime Attendee Created", data: attendee })
    } catch (e) {
        return res.status(e.statusCode || 500).json(e)
    }

});

exports.awsRouter = router;