class Game {
    #settings
    #status = 'pending'

    // List of players
    #player1
    #player2

    constructor() {

    }

    #createPlayers() {
        const player1Position = new Position(
            NumberUtils.getRandomNumber(this.#settings.gridSize.columns),
            NumberUtils.getRandomNumber(this.#settings.gridSize.rows))
        this.#player1 = new Player(1, player1Position)
        const player2Position = new Position(1, 2)
        this.#player2 = new Player(2, player2Position)
    }

    async start() {
        if (this.#status === 'pending') {
            this.#createPlayers()
            this.#status = 'in-process'
        }
    }


    set settings(settings) {
        this.#settings = settings
    }

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
}

class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Player {
    constructor(id, position) {
        this.id = id
        this.position = position
    }
}

class NumberUtils {
    static getRandomNumber(max) {
        return Math.floor(Math.random() * max + 1)
    }
}


// Import for tests
module.exports = {
    Game
}