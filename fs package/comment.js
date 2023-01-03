
//                  ** stat check **
// fs.stat('content.txt',function(err,stat){
//     if(err)return console.log(err)
//     console.log(stat)
// })



//                   ** exist check **
// fs.exists('content.txt', (exists)=>{
//     console.log(exists?"exists":"Not exist")
// })


//                   ** Write file **
// fs.writeFile("content.txt", "/nTesting the functions", function (err, data) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log("Written successfully");
// });

//                    ** .open **
// fs.open('content.txt', 'r+',function(err,data){
//     if(err){
//         return console.error(err)
//     }
//     console.log("Opened successfully")
// })

//                     ** Asynchronous read **
// fs.readFile('content.txt', function (err, data) {
//    if (err) {
//       return console.error(err);
//    }
//    console.log("Asynchronous read: " + data.toString());
// });
