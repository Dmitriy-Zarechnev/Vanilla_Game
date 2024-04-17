const {Game} = require('./game')

describe('Tests for our cool game', () => {
    it('init test', () => {
        const game = new Game()

        game.settings={
            gridSize: {
                columns: 4,
                rows: 5
            }
        }

        expect(game.settings.gridSize.columns).toBe(4)
        expect(game.settings.gridSize.rows).toBe(5)
    })

})