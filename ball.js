//ball class which creates the ball, sets speeds, size, color, and detects collisions
class Ball {
  //declares items related to the ball's construction          
  color; x; y; r;

  //controller used to control movement of the ball
  controller;
  jumping = false;
  onGround = false;

  //friction mechanics learned from Frank Poth: https://www.youtube.com/watch?v=8uIt9a2XBrw
  //sets x speeds
  xInitialSpeed = 1;
  xSpeed = 0;
  xFriction = 0.9;

  // sets y speeds
  jumpHeight = 27;
  yFallSpeed = 1.5;
  ySpeed = 0;
  yFriction = 0.9

  //the endgame is intially declared as inactive so that the rest of the ball controls work. if endgame is true, the balls controls get locked
  endgame = false;

  //building blocks for ball
  constructor(x, y, r, color, controller) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.r = r;
    this.controller = controller;
    this.jumping = false;
  }

  //draws the ball
  spawn() {
    c.fillStyle = (this.color);
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    c.fill();
  }

  //updates ball movement depending on what the user is pressing and where it is
  update() {
    //checks endgame and returns because no longer required to update ball position
    if (this.endgame) {
      return;
    }

    //check for movement direction and set x and y speeds.
    if (this.controller.keyLeft) this.xSpeed -= this.xInitialSpeed;
    if (this.controller.keyRight) this.xSpeed += this.xInitialSpeed;
    if (this.controller.keyJump && this.jumping == false && this.onGround == false) {
      this.ySpeed -= this.jumpHeight;
      this.jumping = true;
    }

    //friction and speed mechanics and gravity (movement mechanics)
    this.x += this.xSpeed;
    this.xSpeed *= this.xFriction;
    this.ySpeed += this.yFallSpeed;
    this.y += this.ySpeed;
    this.ySpeed *= this.yFriction;

    //checking for left and right canvas borders
    if (this.x + this.r > canvas.width) {
      this.x = canvas.width - this.r;
    }
    else if (this.x - ball.r < 0) {
      this.x = this.r;
    }

    //checking for top and bottom canvas borders and if the ball hits the ground
    if (this.y + this.r > canvas.height) {
      this.y = canvas.height - this.r;
      this.onGround = true;
    }
    else if (this.y - this.r < 0) {
      this.y = this.r;
    }
  }

  //builds platform hitboxes for the ball.
  platformHitBoxCheck(platform) {
    //declares ball perimeter
    let ballLeft = this.x - this.r;
    let ballRight = this.x + this.r;
    let ballBottom = this.y + this.r;
    let ballTop = this.y - this.r;

    //declares platform permimeters
    let platformLeft = platform.x;
    let platformRight = platform.x + platform.width;
    let platformBottom = platform.y + platform.height;
    let platformTop = platform.y;

    //if statement tells ball what to do with the game end box (when can it go in, where can it go in, where to go once in)
    if (platform.endgame()) {
      //if condition to enter the end box
      if (ballRight >= platformLeft && ballLeft < platformLeft && ballBottom > platformTop && ballTop < platformBottom) {
        //what to do once in the end box
        this.x = platformLeft + platform.width / 2;
        this.y = platform.y + platform.height / 2;
        this.jumping = false;
        platform.landed = true;
        this.endgame = true;
        return;
      }
    }

    // Check for left.
    if (ballLeft <= platformRight && ballRight > platformRight && ballBottom > platformTop && ballTop < platformBottom) {
      this.x = platformRight + this.r;
    }

    // Check for right.
    if (ballRight >= platformLeft && ballLeft < platformLeft && ballBottom > platformTop && ballTop < platformBottom) {
      this.x = platformLeft - this.r;
    }

    // Check for top.
    if (ballTop <= platformBottom && ballBottom > platformBottom && ballRight > platformLeft && ballLeft < platformRight) {
      this.y = platformBottom + this.r + this.yFallSpeed;
    }

    // Check for bottom.
    if (ballBottom >= platformTop && ballTop < platformTop && ballRight > platformLeft && ballLeft < platformRight) {
      this.y = platformTop - this.r - this.yFallSpeed;
      this.jumping = false;
      this.ySpeed = 0;
      platform.landed = true;
    }
  }
}

