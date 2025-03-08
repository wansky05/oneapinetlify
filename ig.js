const axios = require('axios');
const ig = async (url,baseUrl) =>{
let time = new Date()
// Menyiapkan data form
const formData = new FormData();
formData.append('url', url);
formData.append('new', '2');
formData.append('lang', 'en');
formData.append('app', '');

const config = {
  headers: {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Content-Length': '477',
    'Content-Type': 'multipart/form-data',
    'Origin': 'https://snapinsta.app',
    'Priority': 'u=1, i',
    'Referer': 'https://snapinsta.app/',
    'Sec-CH-UA': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
    'Sec-CH-UA-Mobile': '?0',
    'Sec-CH-UA-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
  }
};

try{

let respon = await axios.post('https://snapinsta.app/get-data.php', formData, config)
if(respon.status == 200){

let thumb = respon.data.files[0].thumbnail_url
let link = respon.data.files[0].video_url
return {status: true, author: "iwan", result:{thumb:thumb, link:link,linkUnblock:`${baseUrl}/download/id?data=${encodeURIComponent(link)}`}}
}else{
  return {status: false, author: "iwan", message: "Gagal mengunduh"}
}
}catch(e){
  return {status: false, author: "iwan", message: e.message}
}
}

module.exports = ig;
