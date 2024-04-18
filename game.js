class Game {
    #settings = {
        gridSize: {
            columns: 4,
            rows: 4
        },
        googleJumpInterval: 2000
    }
    #status = 'pending'
    #googleSetIntervalId
    #score = {
        [1]: {points: 0},
        [2]: {points: 0}
    }

// List of units
    #player1
    #player2
    #google


    constructor() {
    }

// Generate new random coordinates
    #getRandomPosition(coordinates) {
        let newX, newY

        // Generate newX and newY until they become different
        do {
            newX = NumberUtils.getRandomNumber(this.#settings.gridSize.columns)
            newY = NumberUtils.getRandomNumber(this.#settings.gridSize.rows)
        } while (coordinates.some(el => el.x === newX && el.y === newY))

        // Return new Position Class instance
        return new Position(newX, newY)
    }

// Create units for our game
    #createUnits() {
        const player1Position = this.#getRandomPosition([])
        this.#player1 = new Player(1, player1Position)

        const player2Position = this.#getRandomPosition([player1Position])
        this.#player2 = new Player(2, player2Position)

        this.#moveGoogleToRandomPosition(true)
    }

// Run game
    async start() {
        if (this.#status === 'pending') {
            this.#createUnits()
            this.#status = 'in-process'

            this.#runGoogleJumpInterval()
        }
    }

// Stop game
    async stop() {
        clearInterval(this.#googleSetIntervalId)
        this.#status = 'finished'
    }

// Check and create new position for Google
    #moveGoogleToRandomPosition(excludeGoogle) {
        let notCrossedPosition = [this.#player1.position, this.#player2.position]

        // Add new position into array
        if (!excludeGoogle) {
            notCrossedPosition.push(this.#google.position)
        }

        // Create new Google position
        this.#google = new Google(this.#getRandomPosition(notCrossedPosition))
    }

// Interval for changing google position
    #runGoogleJumpInterval() {
        this.#googleSetIntervalId = setInterval(() => {
            this.#moveGoogleToRandomPosition()
        }, this.#settings.googleJumpInterval)
    }

    // --------- Player1 movement ----------------

// Player1 moves to right
    movePlayer1Right() {
        delta = {x: 1}
        this.#checkBorder(this.#player1)
        this.#checkOtherPlayer(this.#player2)
        this.#checkGoogleCatching(this.#player1)
    }

// Player1 moves to left
    movePlayer1Left() {
        delta = {x: -1}
        this.#checkBorder(this.#player1)
        this.#checkOtherPlayer(this.#player2)
        this.#checkGoogleCatching(this.#player1)
    }

// Player1 moves to up
    movePlayer1Up() {
        delta = {y: -1}

    }

// Player1 moves to down
    movePlayer1Down() {
        delta = {y: 1}

    }

    // --------- Player2 movement ----------------

// Player2 moves to right
    movePlayer2Right() {
        delta = {x: 1}
        this.#checkBorder(this.#player2)
        this.#checkOtherPlayer(this.#player1)
        this.#checkGoogleCatching(this.#player2)
    }

// Player2 moves to left
    movePlayer2Left() {
        delta = {x: -1}
        this.#checkBorder(this.#player2)
        this.#checkOtherPlayer(this.#player1)
        this.#checkGoogleCatching(this.#player2)
    }


// Player2 moves to up
    movePlayer2Up() {
        delta = {y: -1}

    }

// Player2 moves to down
    movePlayer2Down() {
        delta = {y: 1}

    }

// ------ Setters -------
    set settings(settings) {
        this.#settings = settings
    }

// ------ Getters -------
    get settings() {
        return this.#settings
    }

    get status() {
        return this.#status
    }

    get player1() {
        return this.#player1
    }

    get player2() {
        return this.#player2
    }

    get google() {
        return this.#google
    }

    get score() {
        return this.#score
    }
}

class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    // Use this method for creating copy
    clone() {
        return new Position(this.x, this.y)
    }

    // Use this method for compare positions
    equal(otherPosition) {
        return otherPosition.x === this.x && otherPosition.y === this.y
    }
}

class Unit {
    constructor(position) {
        this.position = position
    }
}

class Player extends Unit {
    constructor(id, position) {
        super(position)
        this.id = id
    }
}

class Google extends Unit {
    constructor(position) {
        super(position)
    }
}

// Generate and calculate random numbers
class NumberUtils {
    static getRandomNumber(max) {
        return Math.floor(Math.random() * max + 1)
    }
}


// Import for tests
module.exports = {
    Game
}