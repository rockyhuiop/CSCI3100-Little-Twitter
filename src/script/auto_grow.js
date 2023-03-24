export const auto_grow = (id) =>{
    var textarea=document.getElementById(id);
    textarea.style.height = "100px";
    textarea.style.height = (textarea.scrollHeight)+"px";

}