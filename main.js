const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { compare } = require("./geminiAI");

const client = new Client();

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("message_create", async (message) => {
  if (message.body.startsWith("!ping")) {
    console.log(message);
    // send back "pong" to the chat the message was sent in
    const response = await compare(message.body);
    await client.sendMessage(message.from, response);
  }
});

const targetGroupId = "120363041234567890@g.us"; // Ganti dengan ID grup yang diinginkan

client.on("message", async (msg) => {
  if (msg.isGroupMsg && msg.from === targetGroupId) {
    console.log(`Pesan dari grup ${msg.from}: ${msg.body}`);
    // Tambahkan logika untuk memproses pesan di sini
    await client.sendMessage(
      msg.from,
      "Ini adalah balasan otomatis dari bot untuk grup ini."
    );
  }
});
module.exports = { client };
