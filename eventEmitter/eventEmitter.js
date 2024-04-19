export class EventEmitter {
    #subscribers = {
        // Stack all subscribers
        // eventName:[callback, callback, callback]
    }

    addEventListener(eventName, callback) {
        subscribe(eventName, callback)
    }

    on(eventName, callback) {
        subscribe(eventName, callback)
    }

    subscribe(eventName, callback) {
        // If undefined, add empty array
        if (!this.#subscribers[eventName]) {
            this.#subscribers[eventName] = []
        }

        // Add new subscriber
        this.#subscribers[eventName].push(callback)

        // unsubscribe
        return ()=>{
            this.#subscribers[eventName] = this.#subscribers[eventName].filter(el => {
                return callback !== el
            })
        }
    }

    // Call all subscribers
    emit(eventName) {
        this.#subscribers[eventName].forEach(el => el())
    }

    // unsubscribe
    off(eventName, callback) {
        this.#subscribers[eventName] = this.#subscribers[eventName].filter(el => {
            return callback !== el
        })
    }
}
