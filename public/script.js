const socket = io();
const editor = document.getElementById('editor');

let isTyping = false;

socket.on('document', (content) => {
  if (!isTyping) {
    editor.value = content;
  }
});

editor.addEventListener('input', () => {
  isTyping = true;
  const content = editor.value;
  socket.emit('edit', content);
  setTimeout(() => isTyping = false, 300);
});