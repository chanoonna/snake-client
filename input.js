let connection;
let moving;

const setupInput = function(conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  stdin.on('data', handleUserInput);
  return stdin;
};

const handleUserInput = function(data) {
  if (data === '\u0003') {
    process.exit();
  }

  const input = {
    w: "up",
    s: "down",
    a: "left",
    d: "right"
  };

  if (moving) {
    clearInterval(moving);
  }
  moving = setInterval(() => connection.write(`Move: ${input[data]}`), 50);
};

module.exports = {
  setupInput,
};
