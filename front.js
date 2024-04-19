import {Game} from './game.js'



const asyncStart = async () => {
    const game = new Game()

    // game.settings.gridSize={
    //     columns:6,
    //     rows:4
    // }
    await game.start()

    const tableElement = document.querySelector('#grid')

    for (let y = 1; y <= game.settings.gridSize.rows; y++) {
        const trElement = document.createElement('tr')
        for (let x = 1; x <= game.settings.gridSize.columns; x++) {
            const tdElement = document.createElement('td')
            if (game.google.position.x === x && game.google.position.y === y) {
                const googleUnit = document.createElement('img')
                googleUnit.src = './assets/google.svg'
                tdElement.appendChild(googleUnit)
            }
            if (game.player1.position.x === x && game.player1.position.y === y) {
                const player1Unit = document.createElement('img')
                player1Unit.src = './assets/player1.svg'
                tdElement.appendChild(player1Unit)
            }
            if (game.player2.position.x === x && game.player2.position.y === y) {
                const player2Unit = document.createElement('img')
                player2Unit.src = './assets/player2.svg'
                tdElement.appendChild(player2Unit)
            }

            trElement.appendChild(tdElement)
        }
        tableElement.appendChild(trElement)
    }
}

asyncStart()

