const { default: makeWASocket, DisconnectReason, AnyMessageContent, delay, useMultiFileAuthState } = require('@adiwajshing/baileys')
const {Boom} = require("@hapi/boom")
const pino = require("pino")
const color = require('./lib/color')
const figlet = require('figlet')
const lolcatjs = require('lolcatjs')
const fs = require("fs")
const yargs = require('yargs/yargs')
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

if (opts['server']) require('./app')

require('./message/rell.js')
nocache('./message/rell.js', module => console.log(`'${module}' Updated!`))

 
async function glbl() {
 const {state, saveCreds} = await useMultiFileAuthState ('./session')
    async function startSock()  {
        const sock = makeWASocket({
            version: [2, 2208, 7],
            logger: pino({ level: 'silent' }),
            printQRInTerminal: true,
            auth: state,
            browser: ['WhatsApp Status Notifier BOT By MFarelS', 'Chrome', '3.0'],
            patchMessageBeforeSending: (message) => {
                const requiresPatch = !!(
                    message.buttonsMessage ||
                    // || message.templateMessage
                    message.listMessage
                );
                if (requiresPatch) {
                    message = {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadataVersion: 2,
                                    deviceListMetadata: {},
                                },
                                ...message,
                            },
                        },
                    };
                }

                return message;
            },
           
            /*getMessage: async key => {
                console.log('Reconnect')
            }*/
        })
        sock.ev.on('messages.upsert', async m => {
            if (!m.messages) return
            const msg = m.messages[0]
            require('./message/rell.js')(sock, msg)
        })
    
        sock.ev.on('connection.update', (update) => {
                if (global.qr !== update.qr) {
            global.qr = update.qr
        }
                        const { connection, lastDisconnect } = update
            if (connection === 'close') {
               
                lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startSock() : console.log('connection logged out...')
            }
        })
    
        sock.ev.on('creds.update', await saveCreds)
        console.log('----------------------------------------------------------------------------')
        lolcatjs.fromString(color(figlet.textSync('MFS => CDA', { horizontalLayout: 'full' })))
        console.log('----------------------------------------------------------------------------')
        lolcatjs.fromString('[SERVER] Server Started!')
 
        return sock
    }
    
    startSock()
    
}
glbl()
   /**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

  

// run in main file
