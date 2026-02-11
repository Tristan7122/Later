module.exports = {
  command: "menu",
  run: async (sock, m) => {
    const menu = `╭═══〘 \`PHORA-MDx\` 〙═══⊷❍
┃✰│ _*Owner*_ : Tristan
┃✰│ _*Mode*_ : Private
┃✰│ _*Version*_ : 6.2.26
╰═════════════════⊷

╭════〘 *_\`General\`_* 〙════⊷❍
┃✰│ .wcg
┃✰│ .endwcg
┃✰│ .ai
┃✰│ .alive
╰══════════════════⊷❍

╭════〘 *_\`Group\`_* 〙════⊷❍
┃✰│ .tagall
┃✰│ .hidetag
┃✰│ .antilink
┃✰│ .mute
┃✰│ .unmute
┃✰│ .welcome
┃✰│ .goodbye
╰══════════════════⊷❍

╭════〘 *_\`Download\`_* 〙════⊷❍
┃✰│ .song
┃✰│ .yta
┃✰│ .ytv
╰══════════════════⊷❍

*YOURSTRULY*`

    await sock.sendMessage(m.key.remoteJid, { text: menu })
  }
}
