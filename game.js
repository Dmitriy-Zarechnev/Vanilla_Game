 class Game {
    #settings
     set settings(settings){
         this.#settings = settings
     }
     get settings(){
         return this.#settings
     }
}

// Import for tests
module.exports = {
    Game
}