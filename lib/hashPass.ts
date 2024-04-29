const bcrypt = require("bcrypt");

export default function hashPass(unHashPass: string) {
  return bcrypt.hash(unHashPass.trim(), 12).then(function (hash: string) {
    return hash;
  });
}

//?compare
