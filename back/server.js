import {WebSocketServer} from 'ws'
import {EventEmitter} from '../eventEmitter/eventEmitter.js'
import {Game} from '../game.js'


const eventEmitter = new EventEmitter()
const game = new Game(eventEmitter)

// Game start
game.start()


const wssServer = new WebSocketServer({port: 3001})

wssServer.on('connection', function connection(tunnel) {

    game.eventEmitter.subscribe('unitChangePosition', () => {
        const message ={
            type:'event',
            eventName:'unitChangePosition',

        }
        tunnel.send(JSON.stringify(message))
        // console.log(game.getGoogle())
    })

    tunnel.on('message', async function message(data) {

        const action = JSON.parse(data)


        const result = await game[action.procedure]()

        const response = {
            procedure: action.procedure,
            result,
            type: 'response'
        }
        tunnel.send(JSON.stringify(response))

    })
})