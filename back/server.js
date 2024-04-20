import {WebSocketServer} from 'ws'
import {EventEmitter} from '../eventEmitter/eventEmitter.js'
import {GameRemoteProxy as Game} from '../game-remote-proxy.js'


const eventEmitter = new EventEmitter()
const game = new Game(eventEmitter)

// Game start
game.start()
const wssServer = new WebSocketServer({port: 3001})

wssServer.on('connection', function connection(tunnel) {
    tunnel.on('error', console.error)

    tunnel.on('message', function message(data) {
        console.log('received: %s', data)
        tunnel.send(JSONgame)
    })

    //tunnel.send('something')
})