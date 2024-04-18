const {Game} = require('./game')

let game

beforeEach(() => {
    game = new Game()
    game.settings = {
        gridSize: {
            columns: 1,
            rows: 3
        },
        googleJumpInterval: 100
    }
})

describe('Tests for our cool game 😎', () => {
    // -------------------------------------------------
    it('init test', () => {

        game.settings = {
            gridSize: {
                columns: 4,
                rows: 5
            },
            googleJumpInterval: 100
        }

        expect(game.settings.gridSize.columns).toBe(4)
        expect(game.settings.gridSize.rows).toBe(5)
    })

    // -------------------------------------------------
    it('start game function', async () => {

        expect(game.status).toBe('pending')
        // game start
        await game.start()

        expect(game.status).toBe('in-process')
    })

    // -------------------------------------------------
    it('check players start position', async () => {

        for (let i = 0; i < 10; i++) {

            // game start
            await game.start()

            expect([1]).toContain(game.player1.position.x)
            expect([1, 2, 3]).toContain(game.player1.position.y)

            expect([1]).toContain(game.player2.position.x)
            expect([1, 2, 3]).toContain(game.player2.position.y)

            expect([1]).toContain(game.google.position.x)
            expect([1, 2, 3]).toContain(game.google.position.y)

            expect(
                (game.player1.position.x !== game.player2.position.x ||
                    game.player1.position.y !== game.player2.position.y) &&
                (game.player1.position.x !== game.google.position.x ||
                    game.player1.position.y !== game.google.position.y) &&
                (game.player2.position.x !== game.google.position.x ||
                    game.player2.position.y !== game.google.position.y)
            ).toBe(true)
        }
    })

    // -------------------------------------------------
    it('check google position after jump', async () => {
        // game start
        await game.start()

        // google.position copy
        const prevPosition = game.google.position.clone()

        await sleep(150)

        expect(game.google.position).not.toEqual(prevPosition)

    })
})

// Delay function
function sleep(delay) {
    return new Promise((res) => {
        setTimeout(() => {
            res()
        }, delay)
    })
}