const axios = require("axios")

module.exports = {
  command: "ai",
  run: async (sock, m, text) => {
    const q = text.replace(".ai", "")
    if (!q) return
    await sock.sendMessage(m.key.remoteJid, { text: "🤖 AI response coming soon...\n\n*YOURSTRULY*" })
  }
}
