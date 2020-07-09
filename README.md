# Shedding Snake js1024

Shedding Snake is a contribution to [js1024](https://js1024.fun/), an annual javascript golfing competition with a max size of 1kb (1024 bytes), no shim category. The minfied build is exactly 1024b of which 50 bytes is html and 974 bytes js.



*Entire code base of 1024 bytes:*

![code base](./code.png)


## About

Eat apples to grow and shed your skin. Avoid colliding with yourself or skin waste or you'll die. Try to beat the hiscore! Can you reach 25? (Not me 😜)
Controls: WASD or Arrow keys.

![game play](./gameplay300.gif)

## Features that ate bytes

1024 is actually more than enough for a snake game. The extra bytes went into: The snake shed it skin each time it grows. Rotate snake face to current direction. Title screen. Skin pattern and  emojis :-). Score and hiscore.

## How to run

Open the html-file in a modern browser. You can probably just double click it.

## How to build

The script has been minified in three steps. There is no universal solution. For a long time uglify had better results, but I got the smallest builds by running Terser first then Uglify (described below). In the final release I only used Terser though since Uglify would actually increase the size if run on the terser minification.

1. Custom node script
   Run `node shorten-stuff.js` in the src folder.
2. [Terser online](https://xem.github.io/terser-online/)
   Paste the generated `shortened-script.js` into terser.
3. [Uglify online](https://skalman.github.io/UglifyJS-online/)
   Paste the result from terser into uglifyjs.

Create a html `<canvas id=a style="height:99%"/><script>[CODE]</script>` to get an 1kb html-file. Add `<meta charset="UTF-8" />` at top or the emojis will look strange (js1024.fun site already have this meta tag).
