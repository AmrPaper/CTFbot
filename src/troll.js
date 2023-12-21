function target(msg) {
  if (Math.random() < 0.0005) {
    msg.reply("Shut up");
  };
};

function support(msg) {
  if (Math.random() < 0.0005) {
      msg.react("♥");
  };
}

module.exports = {
    target,
    support,
};