/**
 * @condition Evalua que keys utilizar dependiendo del environment
 */
if (process.env.NODE_ENV === "production") {
  //production
  module.exports = require("./prod");
} else {
  //development
  module.exports = require("./dev");
}
