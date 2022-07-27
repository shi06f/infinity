export class InputHandler{
    constructor(chara){
        document.addEventListener("keydown",event =>{
            switch(event.key){
                case 38:
                    chara.up();
                    break;
            }
        })
    }
}
