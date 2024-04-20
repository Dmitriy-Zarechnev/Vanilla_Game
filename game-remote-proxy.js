// ws.on('open', function open() {
//     const array = new Float32Array(5);
//
//     for (var i = 0; i < array.length; ++i) {
//         array[i] = i / 2;
//     }
//
//     ws.send(array);
// });


export class GameRemoteProxy {
    ws = null

    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter
        this.ws = new WebSocket('ws://localhost:3001')
    }


// Run game
    async start() {

    }


// Stop game
    async stop() {

    }


// --------- Player1 movement ----------------
// Player1 moves to right
    movePlayer1Right() {

    }

// Player1 moves to left
    movePlayer1Left() {

    }

// Player1 moves to up
    movePlayer1Up() {
        this.ws.send('hello from front')
    }

// Player1 moves to down
    movePlayer1Down() {

    }

// --------- Player2 movement ----------------
// Player2 moves to right
    movePlayer2Right() {

    }

// Player2 moves to left
    movePlayer2Left() {

    }


// Player2 moves to up
    movePlayer2Up() {

    }

// Player2 moves to down
    movePlayer2Down() {

    }

// ------ Setters -------
    set settings(settings) {

    }

// ------ Getters -------
    get settings() {
        return {
            gridSize: {
                columns: 4, rows: 4
            },
            googleJumpInterval: 2000,
            pointsToWin: 10
        }
    }

    get status() {

    }

    get player1() {
        return {position: {x: 4, y: 2}}
    }

    get player2() {
        return {position: {x: 1, y: 2}}
    }

    get google() {
        return {position: {x: 2, y: 2}}
    }

    get score() {
        return {[1]: {points: 0}, [2]: {points: 0}}
    }
}
