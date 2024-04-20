import {GameRemoteProxy as Game} from './game-remote-proxy.js'
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

    // Find scores from index.html
    const scoresElement = document.querySelector('#scores')


    let renderCounter = 0


    // App logic function
    const render = async (counter) => {
        // Remove previous elements from table
        tableElement.innerHTML = ''
        // Remove previous scores
        scoresElement.innerHTML = ''

        // Get properties from Game
        const score = await game.getScore()
        if (counter < renderCounter) return

        const settings = await game.getSettings()
        if (counter < renderCounter) return

        const google = await game.getGoogle()
        if (counter < renderCounter) return

        const player1 = await game.getPlayer1()
        if (counter < renderCounter) return

        const player2 = await game.getPlayer2()
        if (counter < renderCounter) return


        // Add scores with teg
        scoresElement.append(`player1: ${score[1].points} - player2: ${score[2].points}`)

        for (let y = 1; y <= settings.gridSize.rows; y++) {
            // Create row in table
            const trElement = document.createElement('tr')
            for (let x = 1; x <= settings.gridSize.columns; x++) {
                // Create column in table
                const tdElement = document.createElement('td')
                // Add google unit into field
                if (google.position.x === x && google.position.y === y) {
                    // Create img teg
                    const googleUnit = document.createElement('img')
                    // Add src for img
                    googleUnit.src = './assets/google.svg'
                    // Append img with src to row
                    tdElement.appendChild(googleUnit)
                }
                // Add player1 unit into field
                if (player1.position.x === x && player1.position.y === y) {
                    const player1Unit = document.createElement('img')
                    player1Unit.src = './assets/player1.svg'
                    tdElement.appendChild(player1Unit)
                }
                // Add player2 unit into field
                if (player2.position.x === x && player2.position.y === y) {
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
        renderCounter++
        render(renderCounter)
    })

    render(renderCounter)
}

// Start front App
asyncStart()

