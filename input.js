export class InputHandler{
    constructor(chara){
        document.addEventListener("keydown",event =>{
            switch(event.keyCode){
                case 38:
                    chara.up();
                    break;
            }
        })
    }
}