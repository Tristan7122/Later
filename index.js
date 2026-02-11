const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  Browsers
} = require("@whiskeysockets/baileys")

const fs = require("fs")
const path = require("path")
const pino = require("pino")
const chalk = require("chalk")
const express = require("express")
const config = require("./config")

const app = express()
app.get("/", (_, res) => res.send("PHORA-MDx Running"))
app.listen(config.PORT)

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session")
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    auth: state,
    browser: Browsers.macOS("Chrome"),
    version
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
        startBot()
      }
    }
    if (connection === "open") {
      console.log(chalk.green("✔ PHORA-MDx Connected"))
    }
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return

    const text =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      ""

    const sender = m.key.remoteJid
    const prefix = config.PREFIX
    const isCmd = text.startsWith(prefix)
    const cmd = isCmd ? text.slice(1).split(" ")[0].toLowerCase() : ""

    // Auto reply thanks
    if (config.AUTO_REPLY_THANKS && /thank|thanks/i.test(text)) {
      await sock.sendMessage(sender, { text: "It’s my pleasure 😇\n\n*YOURSTRULY*" })
    }

    // Load plugins
    const plugins = fs.readdirSync("./plugins").filter(f => f.endsWith(".js"))
    for (const file of plugins) {
      const plugin = require(`./plugins/${file}`)
      if (plugin.command === cmd) {
        await plugin.run(sock, m, text)
      }
    }
  })
}

startBot()
