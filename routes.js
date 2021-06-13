const express = require('express')
const router = express.Router()
const newMovie  =require("./newMovie")
const Movies = require("./Movies")
const request = require("request-promise")
const cheerio = require("cheerio")
const CloudflareBypasser = require('cloudflare-bypasser');
const cf = new CloudflareBypasser();       
// const movieslinks = []

router.get('/movie',async(req, res)=> {
  const query = req.query;
      if (query.title) {
        const data = await Movies.find(query)
        res.send(data)
      }else{
        const data = await Movies.find({},{categories:1,image:1,title:1,_id:0});
      res.send(data)
      }
})


// const getMoviesLinks = () => {
//   cf.request("https://themoviesflix.io/page/1").then((res) => {
//       console.log("Start");
//       const $ = cheerio.load(res.body)
//       const movieslength = $(".post-image").length
//       for (let i = 0; i < movieslength; i++) {
//           movieslinks.push($(".post-image").each(()=>{})[i].attribs.href)
//       }
// }).catch((e)=>{
//   console.log(e);
// })
// }
// getMoviesLinks()

// router.post("/movie",async(req,res)=>{
  //  try{
  //    movieslinks.forEach((link)=>{
  //         cf.request(link).then(async(res) => {
  //         const $ = cheerio.load(res.body)
  //           const screenshotsCount1 = $(".aligncenter > img").length
  //           const screenshotsCount2 = $("figure.wp-block-image > img").length
  //           const screenshotsCount3 = $("figcaption > img").length
  //           const screenshotsCount4 = $(".jetpack-lazy-image").length
  //           const screenshotsCount5 = $("img.aligncenter").length
  //           const downloadCount = $("p.has-text-align-center").length
  //           const downloadCount1 = $("p.has-medium-font-size").length
  //           const downloadCount2 = $("h4").length - 3
  //           const downloadCount3 = $("h3").length - 2
  //           const ratingIndex = $('.imdbwp__rating').text().indexOf(":")
  //           const startIndex = $(".imdbwp__header").text().indexOf("(")
  //           const endIndex = $(".imdbwp__header").text().indexOf(")")
  //           const actorIndex = $('.imdbwp__footer').text().indexOf("Actors")+7

  //           const screenshotsfn = () =>{
  //             const sslinks=[]
  //             for (let i = 0; i < screenshotsCount1; i++) {
  //               sslinks.push($(".aligncenter > img").each(()=>{})[i].attribs.src)
  //             }
  //             for (let i = 0; i < screenshotsCount2; i++) {
  //               sslinks.push($("figure.wp-block-image > img").each(()=>{})[i].attribs.src)
  //             }
  //             for (let i = 0; i < screenshotsCount3; i++) {
  //               sslinks.push($("figcaption > img").each(()=>{})[i].attribs.src)
  //             }
  //             for (let i = 0; i < screenshotsCount4; i++) {
  //               sslinks.push($(".jetpack-lazy-image").each(()=>{})[i].attribs.src)
  //             }
  //             for (let i = 1; i < screenshotsCount5; i++) {
  //               sslinks.push($("img.aligncenter").each(()=>{})[i].attribs.src)
  //             }
  //             return sslinks;
  //           }
  
  //          const downloadLink = () => {
  //           const downloadObj = {}
  //           for (let j = 0; j < downloadCount; j++) {
  //             const arr = []
  //             const length = $("p.has-text-align-center")[j].next.children.length
  //             for (let i = 0; i < length; i++) {
  //                  if ($("p.has-text-align-center")[j].next.children[i].attribs) {
  //                     if($("p.has-text-align-center")[j].next.children[i]?.children[0]?.children[0]?.data){
  //                         arr.push([$("p.has-text-align-center")[j].next.children[i].children[0]?.children[0]?.data,$("p.has-text-align-center")[j].next.children[0].children[0].attribs.href])
  //                     }else{
  //                         arr.push([$("p.has-text-align-center")[j].next.children[i].children[0]?.children[0]?.children[0]?.data,$("p.has-text-align-center")[j].next.children[0].children[0].attribs.href])
  //                     }
  //                   }
  //             }
  //             if(arr[0][0]===undefined){}else{
  //               downloadObj[$("p.has-text-align-center")[j].children[0].children[0].data.replace(".",",")] = arr
  //             }
  //           }
  //           return downloadObj;
  //          }
              
  //          const downloadLink1 = () => {
  //           const downloadObj = {}
  //           for (let j = 0; j < downloadCount1; j++) {
  //             const arr = []
  //             const length = $("p.has-medium-font-size")[j].next.children.length
  //             if (length>1) {
  //               for (let i = 0; i < length; i++) {
  //                 if ($("p.has-medium-font-size")[j].next.children[i].attribs) {
  //                    if($("p.has-medium-font-size")[j].next.children[i]?.children[0]?.children[0]?.data){
  //                        arr.push([$("p.has-medium-font-size")[j].next.children[i].children[0]?.children[0]?.data,$("p.has-medium-font-size")[j].next.children[i].attribs.href])
  //                    }else{
  //                        arr.push([$("p.has-medium-font-size")[j].next.children[i].children[0]?.children[0]?.children[0]?.data,$("p.has-medium-font-size")[j].next.children[i].attribs.href])
  //                    }
  //                  }
  //            }
  //             }else{
  //             for (let i = 0; i < length; i++) {
  //                  if ($("p.has-medium-font-size")[j].next.children[i].attribs) {
  //                     if($("p.has-medium-font-size")[j].next.children[i]?.children[0]?.children[0]?.data){
  //                         arr.push([$("p.has-medium-font-size")[j].next.children[i].children[0]?.children[0]?.data,$("p.has-medium-font-size")[j].next.children[0].children[0].attribs.href])
  //                     }else{
  //                         arr.push([$("p.has-medium-font-size")[j].next.children[i].children[0]?.children[0]?.children[0]?.data,$("p.has-medium-font-size")[j].next.children[0].children[0].attribs.href])
  //                     }
  //                   }
  //             }
  //           }
  //             if(arr[0][0]===undefined){}else{
  //               downloadObj[$("p.has-medium-font-size")[j].children[0].data.replace(".",",")] = arr
  //             }
  //           }
  //           return downloadObj;
  //          }

  //          const downloadLink2 = () => {
  //           const downloadObj = {}
  //           for (let j = 0; j < downloadCount2; j++) {
  //             const arr = []
  //             const length = $("h4")[j].next.children.length
  //             for (let i = 0; i < length; i++) {
  //                  if ($("h4")[j].next.children[i].children[0].children[0].attribs) {
  //                     if($("h4")[j].next.children[0].children[0].children[0].children[0].children[0].data){
  //                         arr.push([$("h4")[j].next.children[0].children[0].children[0].children[0].children[0].data,$("h4")[j].next.children[i].children[0].children[0].attribs.href])
  //                     }else{
  //                         arr.push([$("h4")[j].next.children[i].children[0]?.children[0]?.children[0]?.data,$("h4")[j].next.children[0].children[0].attribs.href])
  //                     }
  //                   }
  //             }
  //             if(arr[0][0]===undefined){}else{
  //               downloadObj[$("h4")[j].children[0].data.replace(".",",")] = arr
  //             }
  //           } 
  //           return downloadObj;
  //          }

  //          const downloadLink3 = () => {
  //           const downloadObj = {}
  //           for (let j = 2; j < downloadCount3; j++) {
  //             const arr = []
  //             const length = $("h3")[j].next.children.length
  //             for (let i = 0; i < length; i++) {
  //                  if ($("h3")[j].next.children[i].attribs) {
  //                     if($("h3")[j].next.children[0].children[0].data){
  //                         arr.push([$("h3")[j].next.children[0].children[0].data,$("h3")[j].next.children[i].attribs.href])
  //                     }else{
  //                         arr.push([$("h3")[j].next.children[i].children[0]?.children[0]?.children[0]?.data,$("h3")[j].next.children[0].children[0].attribs.href])
  //                     }
  //                   }
  //             }
  //             if(arr[0][0]===undefined){}else{
  //               if (j===2) {
  //                 downloadObj[$("h3")[j].children[0].data.replace(".",",")] = arr
  //               }else{
  //                 downloadObj[$("h3")[j].children[0].data.replace(".",",")] = arr
  //               }  
  //             }
  //           } 
  //           return downloadObj;
  //          }

  //             const categoriesTrim=()=>{
  //               let newdata = []
  //               let rawdata = $(".imdbwp__meta").text()?.split("|")[1]?.split(",")
  //               for (let i = 0; i < rawdata?.length; i++) {
  //                   newdata.push(rawdata[i]?.trim());
  //               }
  //               return newdata;
  //             }

  //             const actorsTrim = () => {
  //               const newdata = []
  //               const rawdata = $('.imdbwp__footer').text().slice(actorIndex).split(",")
  //               for (let i = 0; i < rawdata?.length; i++) {
  //                 newdata.push(rawdata[i]?.trim());
  //             }
  //             return newdata;
  //             }

  //             let download = {}
  //             if(downloadCount1>0){
  //               download = downloadLink1()
  //             }else if(downloadCount===0&&downloadCount1===0){
  //               if(downloadCount===0&&downloadCount1===0&&downloadCount2===0){
  //                 download = downloadLink3()
  //               }else{
  //                 download = downloadLink2()
  //               }
  //             }
  //             else{
  //               download = downloadLink()
  //             }

  //             const title = $(".entry-title").text()
  //             const image = $(".imdbwp__img").attr('src')
  //             const imdb = $(".imdbwp__link").attr('href')
  //             const name = $('.imdbwp__title').text()
  //             const year = $(".imdbwp__header").text().slice(startIndex+1,endIndex)
  //             const duration = $(".imdbwp__meta").text()?.split("|")[0]
  //             const release_date = $(".imdbwp__meta").text()?.split("|")[2]
  //             const rating = $('.imdbwp__rating').text().slice(ratingIndex+1)
  //             const desc = $('.imdbwp__teaser').text()
  //             const screenshots = screenshotsfn();
  //             const categories = categoriesTrim()
  //             const actors = actorsTrim()

            
  //                     const data = await Movies.findOne({"title":title})
  //                     if(!data){
  //                       // console.log(download);
  //                       console.log(title,actors,name,year,duration,release_date,rating,desc,categories,image,imdb,screenshots,download);
  //                       const Movie = new Movies({title,actors,name,year,duration,release_date,rating,desc,categories,image,imdb,screenshots,download})
  //                       await Movie.save();
  //                     }else{
  //                       console.log("Found!!");
  //                     }
             
  // })
  // })
  //    res.send(movieslinks)
  //  }catch(e){
  //    console.log(e);
  //  }
// }
// )

module.exports = router