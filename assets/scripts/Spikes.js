import Global from './Global';

cc.Class({
    extends: cc.Component,

    properties: {
        spike:{
            default:null,
            type:cc.Prefab
        },
        bigCircle:{
            default:null,
            type:cc.Node
        },
        initSpikeNum:6
    },

    onLoad () {
        this.placeRadius = Global.bigCircleRadius - 4;
        this.initSpike();
    },

    initSpike(){
        for(let i=0;i<this.initSpikeNum;i++){
            let spike = cc.instantiate(this.spike);
            this.node.addChild(spike);
            this.placeSpike(spike,Math.floor(i/2));
        }
    },

    placeSpike(spike,quadrant){
        let randomRotation = Global.mathTool.between(90*quadrant,90*(quadrant+1));
        randomRotation = randomRotation % 360;
        spike.rotation = randomRotation;
        spike.x = this.bigCircle.x + this.placeRadius*Math.cos(randomRotation*Math.PI/180);
        spike.y = this.bigCircle.y - this.placeRadius*Math.sin(randomRotation*Math.PI/180);
        spike.quadrant = quadrant;
    }
});
