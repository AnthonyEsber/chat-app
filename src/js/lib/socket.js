export function initSocket(username, room) {
  const socket = io("http://localhost:3000", { withCredentials: true });

  socket.on("connect", () => {
    console.log("Connected to the socket: ", socket.id);
    socket.emit("join", { username, room });
  });

  socket.on("system", (msg) => {
    console.log("[SYSTEM] ", msg);
  });

  return socket;
}
