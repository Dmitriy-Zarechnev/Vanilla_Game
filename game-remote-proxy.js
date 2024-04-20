// ws.on('open', function open() {
//     const array = new Float32Array(5);
//
//     for (var i = 0; i < array.length; ++i) {
//         array[i] = i / 2;
//     }
//
//     ws.send(array);
// });


export class GameRemoteProxy {
    ws = null

    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter
        //this.ws = new WebSocket('ws://localhost:3001')
    }


// Run game
    async start() {
        this.ws = new WebSocket('ws://localhost:3001')
        this.api = new Api(this.ws)
        this.ws.addEventListener('message', (wsEvent) => {
            const message = JSON.parse(wsEvent.data)
            if(message.type!=='event') return

            this.eventEmitter.emit(message.eventName)
        })

        return new Promise((res) => {
            this.ws.addEventListener('open', res)
        })
    }


// Stop game
    async stop() {

    }


// --------- Player1 movement ----------------
// Player1 moves to right
    movePlayer1Right() {
        this.api.remoteProcedureCall('movePlayer1Right')
    }

// Player1 moves to left
    movePlayer1Left() {
        this.api.remoteProcedureCall('movePlayer1Left')
    }

// Player1 moves to up
    movePlayer1Up() {
        this.api.remoteProcedureCall('movePlayer1Up')
    }

// Player1 moves to down
    movePlayer1Down() {
        this.api.remoteProcedureCall('movePlayer1Down')
    }

// --------- Player2 movement ----------------
// Player2 moves to right
    movePlayer2Right() {
        this.api.remoteProcedureCall('movePlayer2Right')
    }

// Player2 moves to left
    movePlayer2Left() {
        this.api.remoteProcedureCall('movePlayer2Left')
    }


// Player2 moves to up
    movePlayer2Up() {
        this.api.remoteProcedureCall('movePlayer2Up')
    }

// Player2 moves to down
    movePlayer2Down() {
        this.api.remoteProcedureCall('movePlayer2Down')
    }

// ------ Setters -------
    async setSettings(settings) {

    }

// ------ Getters -------
    async getSettings() {
        return this.api.remoteProcedureCall('getSettings')
    }

    async getStatus() {
        return this.api.remoteProcedureCall('getStatus')
    }

    async getPlayer1() {
        return this.api.remoteProcedureCall('getPlayer1')
    }

    async getPlayer2() {
        return this.api.remoteProcedureCall('getPlayer2')
    }

    async getGoogle() {
        return this.api.remoteProcedureCall('getGoogle')
    }

    async getScore() {
        return this.api.remoteProcedureCall('getScore')
    }
}


class Api {
    constructor(ws) {
        this.ws = ws

        this.resolvers = {
            // 'getGoogle':[res]
        }

        this.ws.addEventListener('message', (event) => {
            const resultAction = JSON.parse(event.data)
            if (this.resolvers[resultAction.procedure] && this.resolvers[resultAction.procedure].length > 0) {
                this.resolvers[resultAction.procedure].shift()(resultAction.result)
            }
            //console.log(event.data)
        })
    }

    remoteProcedureCall(procedureName) {
        return new Promise((res) => {
            this.ws.send(JSON.stringify({
                procedure: procedureName
            }))
            if (!this.resolvers[procedureName]) {
                this.resolvers[procedureName] = []
            }

            this.resolvers[procedureName].push(res)
        })
    }


}