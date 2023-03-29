export const toggle_div = (status,cl) =>{
    var div=document.getElementsByClassName(cl)[0];
    if (status===0)
        div.style.display="none";
    else
        div.style.display="block";
        
}
