require('dotenv').config();
const axios = require('axios');
const { google } = require('googleapis');
const MailComposer = require('nodemailer/lib/mail-composer');

// Load environment variables
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const getNewAccessToken = async () => {
    const tokenUrl = "https://oauth2.googleapis.com/token";
    try {
        const response = await axios.post(tokenUrl, new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: REFRESH_TOKEN,
            grant_type: 'refresh_token'
        }));

        const data = response.data;
        console.log("-------------------------------", data);
        if (data.access_token) {
            console.log('New Access Token:', data.access_token);
            return data;
        } else {
            console.error('Error:', data.error, data.error_description);
            throw new Error('Failed to obtain new access token');
        }
    } catch (error) {
        console.error('Full Error Response:', error.response?.data || error.message);
        throw error;
    }
};

const getGmailService = async () => {
    const accessTokenData = await getNewAccessToken();
    console.log('Access Token generated:', accessTokenData.access_token);
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    oAuth2Client.setCredentials(accessTokenData);
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    return gmail;
};

const encodeMessage = (message) => {
    return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const createMail = async (options) => {
    const mailComposer = new MailComposer(options);
    const message = await mailComposer.compile().build();
    return encodeMessage(message);
};

async function sendMail(options) {
    const gmail = await getGmailService();
    const rawMessage = await createMail(options);
    const { data: { id } = {} } = await gmail.users.messages.send({
        userId: 'me',
        resource: {
            raw: rawMessage,
        },
    });
    return id;
};

module.exports = { sendMail };
