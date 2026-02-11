const ytdl = require("ytdl-core")

module.exports = {
  command: "song",
  run: async (sock, m, text) => {
    const url = text.split(" ")[1]
    if (!url) return sock.sendMessage(m.key.remoteJid, { text: "Provide YouTube link" })

    const stream = ytdl(url, { filter: "audioonly" })
    await sock.sendMessage(m.key.remoteJid, {
      audio: stream,
      mimetype: "audio/mpeg"
    })
  }
}
