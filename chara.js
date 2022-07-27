export class Chara{
 constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById("img_chara");
    this.offset = 20;
    this.r = 60;
    this.width = this.r*2;
    this.poisition = {
        x:60,
        y:this.gameHeight-this.offset-this.height
    };
    this.speed = 0;
    this.gravity = 0.5;
    this.lift = -12;
    this.jumpFlag = true;
    this.audio = new this.audio("");
 }

 up(){
    if (this.jumpFlag){
        this.speed = this.lift;
        this.jumpFlag = false;

        this.audio.play(); //ジャンプした時にnew this.audioの音声をplay
    }

 }

 updata(detlaTime){
    this.poisition.y += this.speed;
    this.speed += this.gravity;
    /*もし恐竜の位置が初期位置(this.gameHeight-this.offset-this.height)より大きい場合、位置を初期位置にする */

    if(this.poisition.y >= this.gameHeight-this.offset-this.height){
        this.poisition.y = this.gameHeight-this.offset-this.height;
        this.speed = 0;
        this.jumpFlag = true;
    }
 }
 
 draw(ctx){
    /*ctx.beginPath();
      ctx.arc(this.position.x+this.r, this.position.y+this.r, this.r, 0, 2*Math.PI) */
    ctx.drawImage(this.image, this.poisition.x, this.poisition.y, this.width, this.height);
 }
}