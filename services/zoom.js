const KJUR = require('jsrsasign')
const { ZoomConfig } = require('../config/zoom.config')

const createToken = (meetingNumber, role = 1) => {
    try {
        const iat = Math.round(new Date().getTime() / 1000) - 30
        const exp = iat + 60 * 60 * 2
        const oHeader = { alg: 'HS256', typ: 'JWT' }

        const oPayload = {
            sdkKey: ZoomConfig.meetingClientId,
            appKey: ZoomConfig.meetingClientId,
            mn: meetingNumber,
            role: role,
            iat: iat,
            exp: exp,
            tokenExp: exp
        }

        const sHeader = JSON.stringify(oHeader)
        const sPayload = JSON.stringify(oPayload)
        const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, ZoomConfig.meetingSecret)
        return sdkJWT
    } catch (e) {
        console.log(e);
    }

}

exports.zoomService = {
    createToken
}