export function bindUIEvents(socket) {
  const form = document.querySelector(".chat-c-composer");
  const input = document.querySelector(".chat-c-message-input");

  let typingTimeout;

  form.addEventListener("submit", () => {
    const text = input.value.trim();

    if (!text) return;

    socket.emit("chat:message", text);
    input.value = "";
    socket.emit("typing", false);
  });

  input.addEventListener("input", () => {
    socket.emit(typingTimeout, true);

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("typing", false);
    }, 500);
  });
}
