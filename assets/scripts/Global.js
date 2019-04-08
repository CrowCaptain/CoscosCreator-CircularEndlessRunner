const Global = {
    bigCircleRadius:250,
    playerCircleRadius:25,
    playerMoveSpeed:60,
    playerRotationSpeed:360,
    worldGravity:0.8,
    playerJumpForce:[12,8],

    mathTool:{
        between:function(minNum,maxNum){
            let randomNum = maxNum - minNum;
            let betweenNum = minNum + Math.floor(Math.random()*randomNum);
            return betweenNum;
        }
    }
};
export default Global;