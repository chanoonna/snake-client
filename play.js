const { connect } = require('./client');
const setupInput = function() {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  return stdin;
};

console.log('Connecting ...');

const server = connect();

const sendUser = function() {
  server.write(`Name: CNA`);
  const stdin = setupInput();
  stdin.on("data", handleUserInput);
};

let moving = null;

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
  moving = setInterval(() => server.write(`Move: ${input[data]}`), 50);
};

server.on("connect", sendUser);
