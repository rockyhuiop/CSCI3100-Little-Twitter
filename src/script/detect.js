export const detect = event =>{
    var popup_click=document.getElementsByClassName("hp-popup-click");
    var add_tw=document.getElementsByClassName("hp-addtw")[0];
    var log=document.getElementsByClassName("hp-log")[0];
    var reg=document.getElementsByClassName("hp-reg")[0];
    if (event.target === popup_click[0]) {
        add_tw.style.display="none";
    } else if (event.target === popup_click[1]){
        log.style.display="none";
    } else if (event.target === popup_click[2]){
        reg.style.display="none";
    }
}