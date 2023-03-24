const vis = function(){
    document.getElementById("open").style.display="none";
    document.getElementById("close").style.display="block";
    document.getElementById("pw").type="text";
    if (document.getElementById("conpw")){
        document.getElementById("conpw").type="text";
    }
}
const non_vis = function(){
    document.getElementById("close").style.display="none";
    document.getElementById("open").style.display="block";
    document.getElementById("pw").type="password";
    if (document.getElementById("conpw")){
        document.getElementById("conpw").type="password";
    }
}
export {vis, non_vis}