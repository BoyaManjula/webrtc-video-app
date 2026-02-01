const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

/**
 * CORS
 * Allow all origins for now (safe for demo/projects)
 * You can restrict later if needed
 */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

/**
 * Health check (VERY IMPORTANT for Railway)
 * This tells Railway your app is alive
 */
app.get("/", (req, res) => {
  res.send("🚀 WebRTC backend is running");
});

const server = http.createServer(app);

/**
 * Socket.IO setup
 */
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // ======================
  // JOIN ROOM
  // ======================
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    const clients = io.sockets.adapter.rooms.get(roomId);
    const count = clients ? clients.size : 0;

    socket.emit("room-info", count);
  });

  // ======================
  // WEBRTC SIGNALING
  // ======================
  socket.on("offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("offer", { offer });
  });

  socket.on("answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("answer", { answer });
  });

  socket.on("ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("ice-candidate", { candidate });
  });

  // ======================
  // CHAT (TEXT + FILE META)
  // ======================
  socket.on("chat-message", ({ roomId, data }) => {
    const msgData = {
      ...data,
      senderId: socket.id,
      time:
        data.time ||
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    };

    socket.to(roomId).emit("chat-message", msgData);
  });

  // ======================
  // TYPING INDICATOR
  // ======================
  socket.on("typing", ({ roomId }) => {
    socket.to(roomId).emit("typing", { senderId: socket.id });
  });

  socket.on("stop-typing", ({ roomId }) => {
    socket.to(roomId).emit("stop-typing");
  });

  // ======================
  // DISCONNECT
  // ======================
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

/**
 * 🚨 REQUIRED FOR RAILWAY / CLOUD
 * DO NOT HARD-CODE PORT
 */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
