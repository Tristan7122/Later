module.exports = {
  command: "tagall",
  run: async (sock, m) => {
    const meta = await sock.groupMetadata(m.key.remoteJid)
    const tags = meta.participants.map(p => `@${p.id.split("@")[0]}`).join(" ")
    await sock.sendMessage(m.key.remoteJid, { text: tags, mentions: meta.participants.map(p => p.id) })
  }
}
