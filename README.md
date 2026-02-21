# 🎥 Real-Time WebRTC Video Conferencing Application

A full-stack real-time video conferencing and chat application built using **WebRTC, Socket.IO, Node.js, Express, and React**.

This project enables peer-to-peer video communication with real-time chat and signaling using WebSockets.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- WebRTC (MediaDevices API)
- Socket.IO Client
- HTML, CSS, JavaScript

### Backend
- Node.js
- Express.js
- Socket.IO
- CORS

### Deployment
- Backend: Railway
- Frontend: Netlify

---

## 📌 Features

- 🎥 Real-time Video Calling (WebRTC)
- 🎤 Audio Streaming
- 💬 Real-time Chat (Socket.IO)
- ⌨️ Typing Indicator
- 📂 File Sharing
- 🔗 Room-based communication
- 🌐 Cloud Deployment (Railway + Netlify)

---

## 🧠 How It Works

1. Users join a room.
2. WebRTC establishes peer-to-peer media connection.
3. Socket.IO handles signaling:
   - Offer
   - Answer
   - ICE Candidates
4. Video/audio streams connect directly between users.
5. Chat and typing indicators use WebSockets.

---

## 📂 Project Structure

### 1️⃣ Clone Repository

```bash
git clone https://github.com/BoyaManjula/webrtc-video-app.git
cd webrtc-video-app

Backend Setup
cd backend
npm install
node server.js

Frontend Setup
cd frontend
npm install
npm start
