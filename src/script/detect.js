export const detect = event =>{
    var add_tw_click=document.getElementById("hp-addtw-click");
    var add_tw=document.getElementsByClassName("hp-addtw")[0];
    if (event.target === add_tw_click) {
        add_tw.style.display="none";
    }
}