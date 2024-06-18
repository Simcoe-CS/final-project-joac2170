//controls attributes of platforms and draws the platforms and detects if all platforms are landed on.
class Platform {
  //platform resources to exist
  x; y; width; height; color;
  //variables for checking players progress and seeing if they can end the game or not
  landed = false;
  endingPlatform = false;
  landedAll = false;

  // build resources for platforms
  constructor(x, y, width, height, color, endingPlatform = false) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.endingPlatform = endingPlatform;
  }

  //draws the platform and turns platforms a color if landed on
  generate() {
    if (this.landed) {
      c.fillStyle = 'rgb(8, 8, 90)';
    }
    //leaves platforms normal color if not landed on
    else {
      c.fillStyle = this.color;
    }
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  //triggers endgame when all platforms ahve been landed on and the last platform has been entered.
  endgame() {
    if (this.endingPlatform == true && this.landedAll == true) {
      return true;
    }
    else {
      return false;
    }
  }
}

//loads the entire level.
function generateLand() {
  // base variables for building platforms
  let platX = 30;
  let platY = 560;
  let platWidth = 100;
  let platHeight = 10;
  let gameOver = false;

  //builds platforms (if statement used for ???)
  if (platforms.length == 0) {
    platforms.push(new Platform(platX, platY, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 130, platY - 30, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 340, platY - 30, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 470, platY - 60, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 720, platY - 20, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 840, platY - 90, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 940, platY - 190, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 750, platY - 250, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 550, platY - 290, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 320, platY - 320, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 100, platY - 400, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 150, platY - 490, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 250, platY - 470, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 350, platY - 490, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 490, platY - 440, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 595, platY - 420, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 800, platY - 460, platWidth, platHeight, "#FFFFFF"));
    platforms.push(new Platform(platX + 920, platY - 560, platWidth, 100, "#FFFFFF", true));
  }

  //conditions for checking if endgame can be true:
  //variable for all platforms being landed on or not.
  let landedAllPlatforms = true;
  //variable for the last platform that has to be hit for the game to end.
  let gameCompletePlatform;
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].generate();
    //if statement for letting the game know that all platforms have not been landed on.
    if (platforms[i].landed == false && platforms[i].endingPlatform != true) {
      landedAllPlatforms = false;
    }

    if (platforms[i].endingPlatform == true) {
      gameCompletePlatform = platforms[i];
    }
  }
  
  //if statement for letting the game know all platforms have been landed on.
  if (landedAllPlatforms == true) {
    gameCompletePlatform.landedAll = true;
    gameOver = true;
  }

}
