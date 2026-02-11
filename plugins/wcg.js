let games = {}

module.exports = {
  command: "wcg",
  run: async (sock, m) => {
    const jid = m.key.remoteJid
    if (games[jid]) return sock.sendMessage(jid, { text: "WCG already running" })
    games[jid] = { last: "" }
    sock.sendMessage(jid, { text: "🧠 Word Chain Game started!" })
  }
}
