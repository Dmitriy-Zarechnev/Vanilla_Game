const {Game} = require('./game')

describe('Tests for our cool game', () => {
    // -------------------------------------------------
    it('init test', () => {
        const game = new Game()

        game.settings = {
            gridSize: {
                columns: 4,
                rows: 5
            }
        }
        expect(game.settings.gridSize.columns).toBe(4)
        expect(game.settings.gridSize.rows).toBe(5)
    })

    // -------------------------------------------------
    it('start game function', async () => {
        const game = new Game()

        game.settings = {
            gridSize: {
                columns: 1,
                rows: 2
            }
        }

        expect(game.status).toBe('pending')
        // game start
        await game.start()

        expect(game.status).toBe('in-process')
    })

    // -------------------------------------------------
    it('check players start position', async () => {

        for (let i = 0; i < 10; i++) {
            const game = new Game()

            game.settings = {
                gridSize: {
                    columns: 1,
                    rows: 3
                }
            }
            // game start
            await game.start()

            expect([1]).toContain(game.player1.position.x)
            expect([1, 2]).toContain(game.player1.position.y)

            expect([1]).toContain(game.player2.position.x)
            expect([1, 2]).toContain(game.player2.position.y)

            expect(game.player1.position.x!==game.player2.position.x ||
                game.player1.position.y!==game.player2.position.y)
        }
    })
})