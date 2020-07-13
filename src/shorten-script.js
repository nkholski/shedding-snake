const fs = require("fs");

fs.readFile("./script.js", "utf8", function read(err, content) {
  const replacements = "ERTYUIOPASDFGHJKLZXCVBNM";
  let replacementIndex = 0;
  const replaceQue = [
    ["size", "Q"],
    ["dimx", "Q"],
    ["dimy", "Q"],
    ["Q \\* Q", "W"],
    ["area", "W"],
    ["addApple"],
    ["apos"],
    ["hiscore"],
    ["score"],
    ["direction"],
    ["apple"],
    ["player"],
    ["skin"],
    ["state"],
    ["screen"],
    ["drawColor"],
    ["drawEmoji"],
    ["head"],
    ["tail"],
    ["drawText"],
    ["setFont"],
    ["tick"],
    ["update"],
    ["Q = Q =", "Q ="],
    ["Q = Q =", "Q ="],
    ["===", "=="],
    ["!==", "!="],
    ["GROUND", "0"],
    ["SKIN", "1"],
    ["PLAYER", "2"],
    ["APPLE", "3"],
    ["0 = 0", ""],
    ["1 = 1", ""],
    ["2 = 2", ""],
    ["3 = 3", ""],
    ["const ", ""],
  ];
  replaceQue.forEach((constant) => {
    const regexp = new RegExp(constant[0], "g");
    const replacement =
      constant.length === 2
        ? constant[1]
        : replacements.charAt(replacementIndex++);
    content = content.replace(regexp, replacement);
  });

  // Shorten method calls f("x") to f`x` and ()=> to _=>
  content = content.replace(/([a-zA-Z])\(\"(.*?)\"\)/gi,"$1`$2`");

  content = content.replace(/\(\)\s?\=\>/gi,"_=>");

  fs.writeFile("./shortened-script.js", content, () => {});
});
