const axios = require('axios');
const cheerio = require('cheerio');
async function fbdl(url,baseUrl) {
try {
let respon = await axios.post('https://likeedownloader.com/process', new URLSearchParams({
      'id': decodeURIComponent(url)
    }), {
      'headers': {
        'accept': "*/*",
        'accept-language': "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        'cache-control': "no-cache",
        'content-type': "application/x-www-form-urlencoded; charset=UTF-8",
        'Origin':'https://likeedownloader.com/',
        'Referer': "https://likeedownloader.com/id/facebook-video-downloader",
        'X-Requested-With':'XMLHttpRequest'
      }
})
let arrlink = [];
let $ = cheerio.load(respon.data.template)
 $('.result-links-item').each(async(i,elm)=>{
   let link = $(elm).find('a').attr('href');
   arrlink.push(link)
 })
 let  thumb = $('.img_thumb > img').attr('src');
 let hd = `${baseUrl}/download/id?data=${encodeURIComponent(arrlink[0])}`
 let sd = `${baseUrl}/download/id?data=${encodeURIComponent(arrlink[1])}`
 return {
 status:true,
 author:"iwan",
 result:{thumb:thumb,link:{hd:arrlink[0],sd:arrlink[1]},linkUnblock:{hd:hd,sd:sd}}
 }
}catch(e){
  return {status:false ,author:"iwan",message:e.message}
}
}

module.exports = fbdl;
