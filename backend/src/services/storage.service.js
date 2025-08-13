const ImageKit = require('imagekit');


const ImageKit = new ImageKit({
    publicKey : "",
    privateKey : "",
    urlEndPoint : ""
});

async function uploadFile(file, fileName){
    const result = await ImageKit.upload({
        file, 
        fileName,
        folder: "Drive"
    });

    return result;
} 

module.exports = uploadFile;