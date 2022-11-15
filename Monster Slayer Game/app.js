function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const app = Vue.createApp({
    data(){
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            result: null,
            logMessage:[]
        };
    },
    watch:{
        monsterHealth(value){
            if(value<=0 && this.playerHealth<=0){
                this.monsterHealth = 0;
                this.result = "draw";
            }
            else if(value<=0){
                this.monsterHealth = 0;
                this.result = "player";
            }
        },
        playerHealth(value){
            if(value<=0 && this.monsterHealth<=0){
                this.playerHealth = 0;
                this.result="draw";
            }
            else if(value<=0){
                this.playerHealth = 0;
                this.result="monster";
            }
        }
    },
    computed: {
        monsterBarStyles(){
            return {width: this.monsterHealth + '%' };
        },
        playerBarStyles(){
            return {width: this.playerHealth + '%' };
        },
        specialAttackCheck(){
            return (this.currentRound % 3 != 0); 
        }
    },
    methods: {
        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5,12)
            this.monsterHealth -= attackValue;
            this.addBattleLogMessage('player','attack',attackValue);
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15)
            this.playerHealth -= attackValue;
            this.addBattleLogMessage('monster','attack',attackValue);
        },
        specialAttack(){
            this.currentRound++;
            const attackValue = getRandomValue(10,25)
            this.monsterHealth -= attackValue;
            this.addBattleLogMessage('player','special-attack',attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(10,25);
            if (this.playerHealth + healValue >=100){
                this.playerHealth = 100;
            }
            else{
                this.playerHealth += healValue;
            }
            this.addBattleLogMessage('player','heal',healValue);
            this.attackPlayer();
        },
        startGame(){
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.result = null;
            this.logMessage=[];
        },
        surrender(){
            this.playerHealth = 0;
        },
        addBattleLogMessage(who,what,value){
            this.logMessage.unshift({
                who:who,
                what:what,
                value:value
            })
            console.log(this.logMessage[0])

        }
    }

});
app.mount("#game")