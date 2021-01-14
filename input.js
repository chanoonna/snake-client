let connection;
let moving;
let messagemode = 0;
let message = "";

const setupInput = function(conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  stdin.on('data', handleUserInput);
  return stdin;
};

const sendMessage = function(message) {
  connection.write(`Say: ${message}`);
};

const handleUserInput = function(data) {
  if (data === '\u0003') {
    process.exit();
  }

  const key = data.toLowerCase();
  const input = {
    w: "up",
    s: "down",
    a: "left",
    d: "right"
  };

  if (messagemode === 0 && key === 'm') {
    messagemode = 1;
    message = "";
  }

  if (messagemode === 1 && key !== '`') {
    message += key;
  }

  if (messagemode === 1 && key === '`') {
    sendMessage(message.slice(1));
    messagemode = 0;
  }

  if (input.hasOwnProperty(key) && messagemode === 0) {
    clearInterval(moving);
    moving = setInterval(() => connection.write(`Move: ${input[key]}`), 50);
  }
};

module.exports = {
  setupInput,
};
