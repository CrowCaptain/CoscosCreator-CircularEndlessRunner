cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            default:null,
            type:cc.Node
        },
        spikes:{
            default:null,
            type:cc.Node
        },
        score:{
            default:null,
            type:cc.Node
        },
        particle:{
            default:null,
            type:cc.Prefab
        }
    },


    onLoad () {
        this.playerJS = this.player.getComponent('Player');
        this.spikesJS = this.spikes.getComponent('Spikes');
        this.scoreLabel = this.score.getComponent(cc.Label);

        this.currentScore = 0;

        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        //渲染出碰撞框
        //collisionManager.enabledDebugDraw = true;

        this.node.on('touchstart',this.playerTouched,this);
        this.node.on('playerDead',this.gameOver,this);
        this.node.on('playerPass',this.addScoreAndPlaceSpike,this);
    },

    playerTouched(){
        this.playerJS.jump();
    },

    addScoreAndPlaceSpike(event){
        this.currentScore++;
        this.scoreLabel.string = this.currentScore;

        //level up 
        if(this.currentScore%20 === 0){
            this.playerJS.playerMoveSpeed += 10;
            console.log('level up!');
        }

        let spike = event.getUserData().node;
        this.spikesJS.placeSpike(spike,(spike.quadrant+3)%4);
    },

    gameOver(event){
        this.node.off('touchstart',this.playerTouched,this);

        this.node.removeChild(this.player);
        let playerDeadPosition = event.getUserData();
        let particle = cc.instantiate(this.particle);
        this.node.addChild(particle);
        particle.position = playerDeadPosition;
        particle.getComponent(cc.ParticleSystem).resetSystem();

        //暂时实现
        this.scheduleOnce(()=>{
            cc.director.loadScene('GameScene');
        },2);
    }
});
