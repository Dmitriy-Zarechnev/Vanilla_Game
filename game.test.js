const {Game} = require('./game')

describe('game tests', () => {
    test('first test', () => {
        const game = new Game()
        expect(game.test()).toBe('start game')
    })
})