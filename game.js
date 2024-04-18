class Game {
    #settings = {
        gridSize: {
            columns: 4,
            rows: 4
        },
        googleJumpInterval: 2000
    }
    #status = 'pending'

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

        const googlePosition = this.#getRandomPosition([player1Position, player2Position])
        this.#google = new Google(googlePosition)
    }

    // Run game
    async start() {
        if (this.#status === 'pending') {
            this.#createUnits()
            this.#status = 'in-process'
        }
    }

    // ------ Setters -------
    set settings(settings) {
        this.#settings = settings
    }

    get settings() {
        return this.#settings
    }

    // ------ Getters -------
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