const {GoogleGenAI} = require("@google/genai");
const dotenv = require('dotenv');

dotenv.config();

const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY});

const aiCodeReview = async (code) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Give the time complexity, space complexity and auxiliary " +
            "time complexity, give short and concise explanation, " +
            "how code quality can be improved,dont show the code." + code,
    });
    return response.text;
};

module.exports = {
    aiCodeReview,
};