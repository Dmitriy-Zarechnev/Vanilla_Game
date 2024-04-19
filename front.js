import {Game} from './game.js'
import {EventEmitter} from './eventEmitter/eventEmitter.js'

const asyncStart = async () => {
    const eventEmitter = new EventEmitter()
    const game = new Game(eventEmitter)

    // Change default settings
    // game.settings.gridSize={
    //     columns:6,
    //     rows:4
    // }

    // Game start
    await game.start()

    // Find table from index.html
    const tableElement = document.querySelector('#grid')

    // App logic function
    const render = () => {
        // Remove previous elements from table
        tableElement.innerHTML = ''
        for (let y = 1; y <= game.settings.gridSize.rows; y++) {
            // Create row in table
            const trElement = document.createElement('tr')
            for (let x = 1; x <= game.settings.gridSize.columns; x++) {
                // Create column in table
                const tdElement = document.createElement('td')
                // Add google unit into field
                if (game.google.position.x === x && game.google.position.y === y) {
                    // Create img teg
                    const googleUnit = document.createElement('img')
                    // Add src for img
                    googleUnit.src = './assets/google.svg'
                    // Append img with src to row
                    tdElement.appendChild(googleUnit)
                }
                // Add player1 unit into field
                if (game.player1.position.x === x && game.player1.position.y === y) {
                    const player1Unit = document.createElement('img')
                    player1Unit.src = './assets/player1.svg'
                    tdElement.appendChild(player1Unit)
                }
                // Add player2 unit into field
                if (game.player2.position.x === x && game.player2.position.y === y) {
                    const player2Unit = document.createElement('img')
                    player2Unit.src = './assets/player2.svg'
                    tdElement.appendChild(player2Unit)
                }
                // Append column element to the table
                trElement.appendChild(tdElement)
            }
            // Append row element to the table
            tableElement.appendChild(trElement)
        }
    }

    // Event for clicking keyboard key's
    window.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'ArrowUp':
                game.movePlayer1Up()
                break
            case 'ArrowDown':
                game.movePlayer1Down()
                break
            case 'ArrowRight':
                game.movePlayer1Right()
                break
            case 'ArrowLeft':
                game.movePlayer1Left()
                break
            case 'KeyW':
                game.movePlayer2Up()
                break
            case 'KeyS':
                game.movePlayer2Down()
                break
            case 'KeyD':
                game.movePlayer2Right()
                break
            case 'KeyA':
                game.movePlayer2Left()
                break
        }
    })

    // Add event unitChangePosition and render function
    game.eventEmitter.on('unitChangePosition', () => {
        render()
    })

    render()
}

// Start front App
asyncStart()

