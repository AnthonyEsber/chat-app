const msgLayout = document.querySelector(".chat-l-messages");
let currentUserId = null;

export const ui = {
  bindSocket(socket) {
    socket.on("self", ({ userId }) => {
      currentUserId = userId;
    });

    socket.on("chat:message", (msg) => {
      const isSelf =
        msg.userId && currentUserId && msg.userId === currentUserId;
      this.addMessage(msg, isSelf);
    });
    socket.on("typing", ({ from, isTyping }) => {
      console.log(`${from} typing: `, isTyping);
    });
    socket.on("users", (users) => {
      console.log("Users in room: ", users);
    });
  },

  addMessage({ from, text, ts }, isSelf = false) {
    const div = document.createElement("div");
    div.className = `chat-c-message ${isSelf ? "chat-c-message__sent" : "chat-c-message__incoming"}`;

    div.innerHTML = `<strong> ${from}:</strong> ${text}
    <time class="chat-c-message__timestamp"> ${new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} </time>`;

    msgLayout.appendChild(div);
    msgLayout.scrollTop = msgLayout.scrollHeight; // automatically scroll to new msgs.
  },
};
