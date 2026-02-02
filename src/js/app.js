import { initSocket } from "./lib/socket.js";
import { bindUIEvents } from "./lib/events.js";
import { ui } from "./lib/ui.js";

export function initApp() {
  const username = prompt("Enter username");
  const room = "lobby";

  ui.setLobbyHeader();
  console.log("init app");

  const socket = initSocket(username, room);

  bindUIEvents(socket);
  ui.bindSocket(socket);
}
