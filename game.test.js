const {Game} = require('./game')

describe('Tests for our cool game 😎', () => {
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

    afterEach(async () => {
        await game.stop()
    })

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
        game.settings = {
            gridSize: {
                columns: 1,
                rows: 4
            },
            googleJumpInterval: 100
        }

        // game start
        await game.start()

        // google.position copy
        const prevPosition = game.google.position.clone()

        await sleep(150)

        expect(game.google.position.equal(prevPosition)).toBe(false)
    })

    // -------------------------------------------------
    it('caught google by player1 or player2 for one row', async () => {
        for (let i = 0; i < 10; i++) {
            game.settings = {
                gridSize: {
                    columns: 3,
                    rows: 1
                },
                googleJumpInterval: 100
            }

            // game start
            await game.start()

            // p1 p2 g | p1 g p2 | p2 p1 g | p2 g p1 | g p1 p2 | g p2 p1
            const deltaForPlayer1 = game.google.position.x - game.player1.position.x

            const prevGooglePosition = game.google.position.clone()

            if (Math.abs(deltaForPlayer1) === 2) {
                const deltaForPlayer2 = game.google.position.x - game.player2.position.x
                if (deltaForPlayer2 > 0) {
                    game.movePlayer2Right()
                } else {
                    game.movePlayer2Left()
                }

                expect(game.score[1].points).toBe(0)
                expect(game.score[2].points).toBe(1)
            } else {
                if (deltaForPlayer1 > 0) {
                    game.movePlayer1Right()
                } else {
                    game.movePlayer1Left()
                }

                expect(game.score[1].points).toBe(1)
                expect(game.score[2].points).toBe(0)
            }

            expect(game.google.position.equal(prevGooglePosition)).toBe(false)
        }
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