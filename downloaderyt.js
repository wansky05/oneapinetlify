const axios = require('axios');

// Function to download the file and return it as a buffer
async function downloadFileAsBuffer(url) {
  try {
    const parsedUrl = new URL(url);
    const basehost = parsedUrl.hostname;
    // Set up the request headers
    const headers = {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'Connection': 'keep-alive',
      'Host': basehost,
      'Referer': 'https://cnvmp3.com/',
      'Sec-CH-UA': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      'Sec-CH-UA-Mobile': '?0',
      'Sec-CH-UA-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'cross-site',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    };

    // Make the HTTP request to download the file
    const response = await axios.get(url, {
      headers: headers,
      responseType: 'arraybuffer', // Handle binary data like mp3 files
    });

    // Return the buffer data
    return response.data;
  } catch (error) {
    console.error('Error downloading the file:', error);
    throw error;  // Rethrow the error if needed
  }
}

// Export the function so it can be imported in other files
module.exports = downloadFileAsBuffer;
