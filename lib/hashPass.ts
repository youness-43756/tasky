const bcrypt = require("bcrypt");

function hashPass(unHashPass: string) {
  return bcrypt.hash(unHashPass.trim(), 12).then(function (hash: string) {
    return hash;
  });
}

//?compare
function isSamePass(unHashPass: string, hashedPass: string) {
  return bcrypt
    .compare(unHashPass, hashedPass)
    .then((result: boolean) => result);
}
export { hashPass, isSamePass };
