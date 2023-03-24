export const show_pop = () =>{
    document.getElementById("hp-logout-pop").classList.toggle("show");
    var down = document.getElementById("hp-down");
    var up = document.getElementById("hp-up");
    if (up.style.display=="none"){
        down.style.display="none";
        up.style.display="";
    } else {
        down.style.display="";
        up.style.display="none";
    }
}