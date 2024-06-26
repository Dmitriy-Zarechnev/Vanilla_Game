export class Game {
    #settings = {
        gridSize: {
            columns: 4, rows: 4
        },
        googleJumpInterval: 2000,
        pointsToWin: 10
    }
    #status = 'pending'
    #googleSetIntervalId
    #score = {
        [1]: {points: 0}, [2]: {points: 0}
    }

// List of units
    #player1
    #player2
    #google


    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter
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
        this.#status = 'stopped'
    }


// Finish him!
    async #finish() {
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

        // Notice subscribers
        this.eventEmitter.emit('unitChangePosition')
    }


// Interval for changing google position
    #runGoogleJumpInterval() {
        this.#googleSetIntervalId = setInterval(() => {
            this.#moveGoogleToRandomPosition()
        }, this.#settings.googleJumpInterval)
    }


// Check border next to player
    #checkBorder(player, delta) {
        const newPosition = player.position.clone()
        if (delta.x) newPosition.x += delta.x
        if (delta.y) newPosition.y += delta.y

        if (newPosition.x < 1 || newPosition.x > this.#settings.gridSize.columns) {
            return true
        }
        if (newPosition.y < 1 || newPosition.y > this.#settings.gridSize.rows) {
            return true
        }

        return false
    }


// Check player next to player
    #checkOtherPlayer(movingPlayer, otherPlayer, delta) {
        const newPosition = movingPlayer.position.clone()
        if (delta.x) newPosition.x += delta.x
        if (delta.y) newPosition.y += delta.y
        return otherPlayer.position.equal(newPosition)
    }


// Check catching of Google
    #checkGoogleCatching(player) {
        if (this.#google.position.equal(player.position)) {
            this.#score[player.id].points++
            if (this.#score[player.id].points === this.#settings.pointsToWin) {
                this.#finish()
                this.#google.position = new Position(-1, -1)
                //this.#google.position = new Position(this.#settings.gridSize.columns + 1, this.#settings.gridSize.rows + 1)
            } else {
                clearInterval(this.#googleSetIntervalId)
                this.#moveGoogleToRandomPosition()
                this.#runGoogleJumpInterval()
            }
        }
    }


// Method for moving players
    #movePlayer(movingPlayer, otherPlayer, delta) {
        const isBorder = this.#checkBorder(movingPlayer, delta)
        const isOtherPlayer = this.#checkOtherPlayer(movingPlayer, otherPlayer, delta)
        // we cannot pass throw border or other player
        if (isBorder || isOtherPlayer) return

        if (delta.x) {
            movingPlayer.position = new Position(
                movingPlayer.position.x + delta.x,
                movingPlayer.position.y
            )
        } else {
            movingPlayer.position = new Position(
                movingPlayer.position.x,
                movingPlayer.position.y + delta.y
            )
        }

        this.#checkGoogleCatching(movingPlayer)

        // Notice subscribers
        this.eventEmitter.emit('unitChangePosition')
    }

// --------- Player1 movement ----------------
// Player1 moves to right
    movePlayer1Right() {
        this.#movePlayer(this.#player1, this.#player2, {x: 1})
    }

// Player1 moves to left
    movePlayer1Left() {
        this.#movePlayer(this.#player1, this.#player2, {x: -1})
    }

// Player1 moves to up
    movePlayer1Up() {
        this.#movePlayer(this.#player1, this.#player2, {y: -1})
    }

// Player1 moves to down
    movePlayer1Down() {
        this.#movePlayer(this.#player1, this.#player2, {y: 1})
    }

// --------- Player2 movement ----------------
// Player2 moves to right
    movePlayer2Right() {
        this.#movePlayer(this.#player2, this.#player1, {x: 1})
    }

// Player2 moves to left
    movePlayer2Left() {
        this.#movePlayer(this.#player2, this.#player1, {x: -1})
    }


// Player2 moves to up
    movePlayer2Up() {
        this.#movePlayer(this.#player2, this.#player1, {y: -1})
    }

// Player2 moves to down
    movePlayer2Down() {
        this.#movePlayer(this.#player2, this.#player1, {y: 1})
    }

// ------ Setters -------
    async setSettings(settings) {
        this.#settings = {...this.#settings, ...settings}

        // Prevent case with undefined inside settings.gridSize
        this.#settings.gridSize = settings.gridSize
            ? {...this.#settings.gridSize, ...settings.gridSize}
            : this.#settings.gridSize
    }

// ------ Getters -------
    async getSettings() {
        return this.#settings
    }

    async getStatus() {
        return this.#status
    }

    async getPlayer1() {
        return this.#player1
    }

    async getPlayer2() {
        return this.#player2
    }

    async getGoogle() {
        return this.#google
    }

    async getScore() {
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
// module.exports = {
//     Game
// }