# Shedding Snake js1024

Shedding Snake is a contribution to [js1024](https://js1024.fun/), an annual javascript golfing competition with a max size of 1kb (1024 bytes), no shim category. 

The minfied build is exactly 1024 bytes:
* 51 bytes HTML/CSS
* 34 bytes text
* 28 bytes of emojis (7 emojis requiring 4 bytes each)
* 911 bytes javascript (not counting the 34+28 bytes above)

## [Play the game at JS1024.fun](https://js1024.fun/demos/2020#24)

*Entire code base of 1024 bytes:*

![code base](./code.png)


## About

Eat apples to grow and shed your skin. Avoid colliding with yourself or skin waste or you'll die. Try to beat the hiscore! Can you reach 25? (Not me 😜)
Controls: WASD or Arrow keys.

![game play](./gameplay300.gif)

## Features that ate bytes

1024 is actually more than enough for a snake game. The extra bytes went into: The snake shed it skin each time it grows. Rotate snake face to current direction. Title screen. Skin pattern and  emojis :-). Score and hiscore. I fought one last hour to get a flashing "Press S" into the game.

## How to run

Open the html-file in a modern browser. You can probably just double click it.

## How to build

The script has been minified in two steps.

1. Custom node script
   Run `node shorten-stuff.js` in the src folder.
2. [Terser online](https://xem.github.io/terser-online/)
   Paste the generated `shortened-script.js` into terser. With Regpack(JS) turned on there are actually 60 bytes left, enough to center the game or something, but I didn't know about that option.

Create a html `<canvas id=a style="height:99%"/><script>[CODE]</script>` to get an 1kb html-file. Add `<meta charset="UTF-8" />` at top or the emojis will look strange (js1024.fun site already have this meta tag).
