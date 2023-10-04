require("dotenv").config();
const { Op } = require('sequelize')
const { User, Chat } = require('../models')
const axios = require('axios')
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

class chatController {
    static async fetchAnswer(req, res) {
        try {
            const { question } = req.body
            // console.log(question, '<<<<<<di controller');
            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": question }],
            });

            // console.log(chatCompletion.choices[0].message,'<<<<<di controller');
            res.status(201).json({
                answer: chatCompletion.choices[0].message
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                "message": "Internal server error"
            })
        }
    }
    static async fetchPickup(req, res) {

        const options = {
            method: 'GET',
            url: 'https://pickup-lines-api.p.rapidapi.com/pickupline',
            headers: {
                'X-RapidAPI-Key': '5cdd21589emshefb032ca321bfa8p1c1c1ajsn719668d3f3b1',
                'X-RapidAPI-Host': 'pickup-lines-api.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);

            res.status(201).json({
                pickupLine: response.data
            })
        } catch (error) {
            console.error(error);
        }
    }
    static async generateQr(req, res, next) {
        try {
            const { qr_code_text } = req.body;
            console.log(req.body, '<<<<di controller');
            const accessToken = 'WicicsTbvaTYL_G_nS56x1ig_Jm5YQRh-5eckKub4_yxjRFLu71BlQ8sN2aSyapd';
            const response = await axios.post(
                `https://api.qr-code-generator.com/v1/create?access-token=${accessToken}`,
                {
                    frame_name: "no-frame",
                    qr_code_text: qr_code_text,
                    image_format: "SVG",
                    qr_code_logo: "scan-me-square",
                    background_color: "#ffffff",
                    foreground_color: "#fa6e79",
                }
            );
            res.send(response.data);
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = chatController