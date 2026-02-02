const msgLayout = document.querySelector(".chat-l-messages");
let currentUserId = null;
const userList = document.querySelector(".chat-c-user-list");

export function renderUsers(users) {
  [...userList.children].forEach((li) => {
    if (!li.classList.contains("chat-c-user--lobby")) {
      li.remove();
    }
  });

  const seen = new Set();

  users.forEach((user) => {
    if (seen.has(user)) return;
    seen.add(user);

    const li = document.createElement("li");

    li.className = "chat-c-user";

    li.dataset.userId = user.id;

    li.innerHTML = `
    <div class="chat-l-user__container">
    <div class = "chat-l-user__contaner__inner">
    <img class = "chat-c-user__image"
    src="src/media/user.jpg"
    alt="${user}"
    />
    <div class="chat-c-user__details">
    <div class="chat-c-user__name">${user}</div>
    <div class="chat-c-user__message">Online</div>
    </div>
    </div>
    <span class="chat-c-user__timestamp">-</span>
    </div>
    `;

    userList.appendChild(li);
  });
}

export const ui = {
  setLobbyHeader() {
    console.log("test");
    document.querySelector(".chat-c-user__chat-info__name").textContent =
      "Global";
    document.querySelector(".chat-c-user__chat-info_status").textContent =
      "Global chat - everyone sees this.";
  },
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
      console.log(users);
      renderUsers(users, currentUserId);
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
