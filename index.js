import { Chara } from "./chara.js";
import { Input } from "./input.js";
import { Bomb } from "./bomb.js";

//ランダム整数生成
export function getRandomInt(min,max){
    return Math.floor(min+Math.random()*(max-min+1));
}

var gamestate = true; //falseでゲームが止まる
var score = 0;

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let backImg = document.getElementById("img_back"); //ゲーム背景

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

let chara = new Chara(GAME_WIDTH,GAME_HEIGHT);
new InputHandler(chara);
let bomb = [];

let lastTime = 0;
let counter = 0;
let interval = 0;

function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.drawImage(backImg,0,0,GAME_WIDTH,GAME_HEIGHT);

    chara.update(deltaTime);
    chara.draw(ctx);

    counter += deltaTime;
    if(counter > interval){
        bomb.push(new Bomb(GAME_WIDTH,GAME_HEIGHT));
        counter = 0;
        interval = getRandomInt(1000,3000); //インターバル1秒から３秒の乱数
    }

    ctx.font = "50px sans-serif"; //スコア文字の大きさとフォント
    ctx.fillText("Score:"+score,60,60); //スコアの配置場所

    for(var i = bomb.length-1; i >= 0; i--){ 
        bomb[i].update(deltaTime);
        bomb[i].draw(ctx);

        //爆弾とキャラが当たった判定
        if(bomb[i].checkHit(chara.position.x,chara.position.y,chara.r,bomb[i].position.x,bomb[i].position.y,bomb[i].r)){
            //衝突したら音を出す
            var playbomb = bomb[i].audio.play();
            
            if(playbomb !== undefined){
                playbomb.then(_ =>{

                })
                .catch(error =>{
                    console.log(error);
                });
            }

            gamestate=false;

            chara.audio.muted = true; //キャラのジャンプ音をミュート

        }
        //爆弾の位置が画面外に出たら爆弾の配列削除
        if(bomb[i].offScreen()){
            score++;
            bomb.shift();
        }
    }

    //falseであればゲームストップ
    if(!gamestate){
        return;
    }
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);