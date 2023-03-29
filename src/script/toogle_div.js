export const tooogle_div = (status,cl) =>{
    var add_tw=document.getElementsByClassName(cl)[0];
    if (status===0)
        add_tw.style.display="none";
    else
        add_tw.style.display="block";
        
}
