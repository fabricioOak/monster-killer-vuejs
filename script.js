new Vue ({
	el: '#app',
	data: {
		running: false,
		playerLife: 100,
		monsterLife: 100,
		logs: [],
	},

	computed: {
		hasResult() {
			return this.playerLife == 0 || this.monsterLife == 0
		}
	},

	methods:{
		startGame(){
			this.running = true,
			this.playerLife = 100,
			this.monsterLife =100,
			this.logs = []
		},

		attack(special){
			this.damage('monsterLife', 1,8, special, 'Player', 'Monster', 'pl')
			if(this.monsterLife>0){
			this.damage('playerLife', 4,10,false, 'Monster', 'Player', 'mons')
			}
		},

		damage(name, min, max, special, source, target, cls){
			const plus = special ? 5 : 0
			const hurt  = this.getRandom(min + plus, max + plus)
			this[name] = Math.max(this[name] - hurt, 0)
			this.getLogs(`The ${source} hits the ${target} with ${hurt}.`, cls)
		},
		healAndHurt(){
			this.heal(4,25)
			this.damage('playerLife', 5,10,false, 'Monster', 'Player', 'mons')

		},
		heal (min, max){
			const heal = this.getRandom(min, max)
			this.playerLife = Math.min(this.playerLife + heal, 100)
			this.getLogs(`The player heals ${heal}.`, 'pl')
		},
		getRandom(min , max){
			const value = Math.random() * (max - min) + min
			return Math.round(value)
		},
		getLogs(text, cls){
			this.logs.unshift({text, cls})
		},
	},

	watch: {
		hasResult(value){
			if(value) this.running = false
		}
	}
})