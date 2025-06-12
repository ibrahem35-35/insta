// netlify/functions/download.js

const axios = require('axios');

exports.handler = async function (event, context) { if (event.httpMethod === 'GET') { const url = event.queryStringParameters.url; if (!url) { return { statusCode: 400, body: JSON.stringify({ error: 'يرجى إرسال رابط Instagram عبر المعامل ?url=' }), }; }

const apiUrl = 'https://instagram-reel-api.onrender.com/';
try {
  const response = await axios.get(apiUrl, { params: { url } });
  const data = response.data;
  const downloadLink = data.download_link;

  if (downloadLink) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, download_link: downloadLink }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: false, message: 'لم يتم العثور على رابط التحميل.' }),
    };
  }
} catch (error) {
  return {
    statusCode: 500,
    body: JSON.stringify({ error: error.message }),
  };
}

} else { return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }), }; } };

