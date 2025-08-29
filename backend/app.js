// app.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;

//  server HTTP for Socket.IO 
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // in dev ok, in prod dominio frontend
  }
});

// Class for messages
class ChatMessage {
  constructor(id, user, message) {
    this.id = id;
    this.user = user;
    this.message = message;
  }
}

// Array to memorized messages
const messages = [];

// Endpoint REST optional to retrieve messages
app.get("/chat", (req, res) => {
  res.json(messages);
    messages=[];
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("New client connected :", socket.id);

  // Invia messaggi esistenti al client appena connesso
  socket.emit("init", messages);

  // Nuovo messaggio
  socket.on("message", (data) => {
    const chatMessage = new ChatMessage(socket.id, data.user, data.message);
    messages.push(chatMessage);

    // Invia a tutti i client
    io.emit("message", chatMessage);
  });

  // Evento per cancellare la chat
  socket.on("clearChat", () => {
    messages.length = 0; // svuota l'array senza perdere il riferimento
    io.emit("init", messages); // aggiorna tutti i client
    console.log("Chat emptied from server");
  });

  socket.on("disconnect", () => {
    console.log("Client logout:", socket.id);
  });
});

// server on port !
httpServer.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

