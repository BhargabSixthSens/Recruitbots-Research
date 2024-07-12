const AWS = require('aws-sdk');
const { AwsRegions } = require('../constants/aws');
const { AwsConfig } = require('../config/aws.config');

// Required - "us-east-1" (only supported region for Chime api)
const chime = new AWS.ChimeSDKMeetings({
    region: AwsRegions.NORTH_VIRGINIA,
    credentials: {
        accessKeyId: AwsConfig.accessKeyId,
        secretAccessKey: AwsConfig.secretAccessKey
    }
});

const createMeeting = async ({ clientRequestToken, externalMeetingId }) => {
    return await chime
        .createMeeting({
            ClientRequestToken: clientRequestToken,
            MediaRegion: AwsRegions.MUMBAI, // Specify the region in which to create the meeting.
            ExternalMeetingId: externalMeetingId
        })
        .promise();
}

const createAttendee = async ({ meetingId, externalUserId }) => {
    const attendeeRequest = {
        MeetingId: meetingId,
        ExternalUserId: externalUserId, // Identifier for the user
    };
    return await chime.createAttendee(attendeeRequest).promise();
}

const getMeeting = async (meetingId) => {
    return await chime.getMeeting({ MeetingId: meetingId }).promise();
}

exports.chimeService = {
    createAttendee,
    createMeeting,
    getMeeting
}