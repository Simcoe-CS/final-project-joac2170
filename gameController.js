//GameController controls movement keys and movemnt of the ball
class GameController {
    //movement key that was pressed
    keyLeft = false;
    keyRight = false;
    keyJump = false;

    //movement keys
    moveLeftKey = "a";
    moveRightKey = "d";
    jumpUpKey = " ";

    constructor() {
    }

    //listening for key events.
    keyListener(event) {
        let keyState = false;
        let key = event.key.toLowerCase();

        //tells if key is in up or down state
        if (event.type == "keydown") {
            keyState = true;
        }
        else {
            keyState = false;
        }

        //goes through each movement key to determine if it is on or off.
        switch (key) {
            case this.moveLeftKey: // left key
                this.keyLeft = keyState;
                break;

            case this.moveRightKey: // right key
                this.keyRight = keyState;
                break;

            case this.jumpUpKey: // jump key
                this.keyJump = keyState;
                break;
        }
    }
}