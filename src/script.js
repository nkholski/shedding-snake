/*
  Shedding Snake
  ===============
  Git repository: github.com/nkholski/shedding-snake
  GNU GENERAL PUBLIC LICENSE, ©2020 Niklas Berg

  This was made for fun. All of the code that follows are example of bad practices,
  it would never scale or be anything close to as performant that it should be.
  Don't try learn from it. :-) That said, feel free to see how it was done.
*/

// These constants are completely removed and replaced with numbers in minification
const GROUND = 0;
const SKIN = 1;
const PLAYER = 2;
const APPLE = 3;

// Variable initializations
// The screen is an array of dimx*dimy elements representing whats on each square in the grid.
// I initalizes it as a global here and as a number to save space and because Javascript doesn't care 🤷
area = a.width = a.height = 9e2;
size = dimx = dimy = 30;
tick = screen = u = l = d = r = state = apos = score = direction = apple = player = skin = hiscore = 0;

// Get context and center all text
c = a.getContext("2d");
c.textAlign = "center";

// This is a sligtly altered version of XEMs input handler for arrow keys and WASD. https://xem.github.io/articles/jsgamesinputs.html
onkeydown = (e) => {
  top["lld*rlurdu"[(e.which % 32) % 17]] = e.type[5];
  // The direction starts with 2 so that I can rotate the snake head with `c.rotate(direction * 1.6)` instead
  // of `c.rotate(direction * 1.6 + 1.6)` in the drawEmoji-function
  direction = u ? 2 : r ? 3 : d ? 4 : l ? 5 : direction;
  u = l = d = r = 0;
};

// screen[apos] might contain the snake or skin which are numbers above 0 and thus truthy,
// otherwise 0 or undefined which is both falsy. x|0 is a bitwise operation equivalent to Math.floor(x)
const addApple = () => {
  do {
    apos = (dimx * dimy * Math.random()) | 0;
  } while (screen[apos]);
  screen[apos] = APPLE;
};

// c.fillStyle called multiple times --> a shorter function reduces code
const drawColor = (d="#000") => (c.fillStyle = d);

// We just want centered x most of the times so that can have a default value.
// The value is multiplied with 9 istead of 10 to save a letter. Center is (900 / (2 * 9)) = 50
const drawText = (t, y=3, x = 50) => c.fillText(t, x * 9, y * 9);

// The emoji is printed with an offset from current translation for a square in the draw loop.
// Also b rotates that context so that the head can face correct direction.
// 90 degrees == Pi/2 radians which is rounded to a rough 1.6
// I added the parts to save one byte skipping curly brackets.
const drawEmoji = (a, rotationInRadians=0) =>
  c.translate(15, 15)+
  c.rotate(direction * rotationInRadians)+
  drawText(a, .5, 0);

// To set font we need a font size and a font. "a" makes the statement valid but
// fall back to default font since "a" is missing.
const setFont = (a) => (c.font = a+"px a");

setInterval(() => {
  // state is either 1 (truthy) or 0 (falsy), to save space this is used instead of switch/case or if/else if
  if (state) {
    // MAIN GAME LOOP
    // The font should be 25 in this state. I set it each loop so that I don't have to waste chars on checking if it's done.
    setFont(25);
    // Move head in the current direction
    head =
      player[0] +
      (direction == 2
        ? -dimx
        : direction == 3
        ? 1
        : direction == 4
        ? dimx
        : -1);
    // Fix head position when outside screen
    head += head < 0 ? dimx * dimy : head > dimx * dimy ? -dimx * dimy - 1 : 0;
    // Remove tail and add head == the snake has moved
    tail = player.pop();
    player = [head, ...player];
    // if it's shedding, reduce and leave part of the skin, otherwise add blank space
    screen[tail] = --skin < 0 ? 0 : 1;

    if (screen[head] === APPLE) {
      // If there is an apple on the head square, spawn new apple and reattach the old tail == the snake has grown
      addApple();
      screen[tail] = PLAYER;
      // Add skin to shed, and mark current body as skin
      skin = player.length;
      screen = screen.map((c) => (c == PLAYER ? 1 : c));
      hiscore = ++score > hiscore ? score : hiscore;
      // Make the snake longer
      player.push(tail);
    }
    // screen[head] undefined or 0 is ok since 0 is falsy, otherwise we have collided
    else if (screen[head]) {
      skin = score = direction = state = 0;
      return;
    }
    // Add the new head to the screen
    screen[head] = PLAYER;
     
    // Loop through and draw screen
    for (i = 0; i < dimx * dimy; i++) {
      c.save();
      setFont(25);
      // Get the x position
      x = i % dimx;
      c.translate(x * size, i - x);
      // If player head has the current coordinate, draw a frog head (sorry)
      $=player[0] == i;
      if ($) {
        drawEmoji("🐸", 1.6);
      }
      // Draw color from the correct index and black if it's an apple
      // The color array has two undefined indicies witch will make drawColor
      // use default parameter value ("#000"), screen[i] might be undefined too
      // with the same result.
      drawColor([, "#DDD", "#693"][screen[i]]);
      if(!$){c.fillRect(0, 0, size, size);
      // Add an X on the back of the snake and add an apple
      screen[i] == PLAYER ? drawEmoji("✖️") : 0;
      screen[i] == APPLE ? drawEmoji(i%2?"🍎":"🍒") : 0;
      }
      c.restore();
    }
    drawColor("#099");
    drawText(`🕹️Score: ${score} 🐍 Top: ${hiscore}⭐`);
  } else {
    // TITLE SCREEN
    setFont(60);
    drawColor("#099");
    drawText("🐍Shedding Snake", size);
    ++tick%2?drawColor():0;
    drawText("Press S", 42);

    // Resent screen, add apple, place player each loop. If a key is pressed (picked up as direction)
    // set the state to 1 (the game state is truthy). Yes any directional key would work, but "S" is
    // enough as an instruction :-).
    screen = [];
    addApple();
    player = [dimx / 2 + (dimx * dimy) / 2];
    screen[player] = PLAYER;
    state = direction ? 1 : state;
  }
}, 150); // Update once every 150 ms, because it felt OK. Normally you should use requestAnimationFrame.
