import Global from './Global';

cc.Class({
    extends: cc.Component,

    properties: {
        bigCircle: {
            default: null,
            type: cc.Node
        },
    },


    onLoad() {
        this.moveRadius = Global.bigCircleRadius + Global.playerCircleRadius;
        this.playerRotationSpeed = Global.playerRotationSpeed;
        this.playerMoveSpeed = Global.playerMoveSpeed;
        this.playerJumpForce = Global.playerJumpForce;
        this.moveRotation = -70;
        this.jumpForce = 0;
        this.jumpDistance = 0;
        this.ableJump = 0;
    },

    update(dt) {
        if (this.ableJump) {
            this.jumpDistance += this.jumpForce;
            this.jumpForce -= Global.worldGravity;
            if (this.jumpDistance <= 0) {
                this.jumpDistance = 0;
                this.jumpForce = 0;
                this.ableJump = 0;
            }
        }
        this.node.rotation += dt * this.playerRotationSpeed;
        this.moveRotation += this.playerMoveSpeed * dt;
        this.moveRotation = this.moveRotation % 360;
        let distance = this.moveRadius + this.jumpDistance;
        let distanceX = distance * Math.cos(this.moveRotation * Math.PI / 180);
        let distanceY = distance * Math.sin(this.moveRotation * Math.PI / 180);
        this.node.x = this.bigCircle.x + distanceX;
        this.node.y = this.bigCircle.y - distanceY;
    },

    onCollisionEnter(other, self) {
        if (other.tag === 0) {
            event = new cc.Event.EventCustom('playerDead',true);
            event.setUserData(self.node.position);
            this.node.dispatchEvent(event);
        }
    },

    onCollisionExit(other, self) {
        if (other.tag === 1) {
            event = new cc.Event.EventCustom('playerPass', true);
            event.setUserData(other);
            this.node.dispatchEvent(event);
        }
    },

    jump() {
        if (this.ableJump < 2) {
            this.ableJump++;
            this.jumpForce = this.playerJumpForce[this.ableJump - 1];
        }
    }
});
