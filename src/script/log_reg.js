const vis = function(cl){
    document.getElementById("open").style.display="none";
    document.getElementById("close").style.display="block";
    document.getElementById(cl+"pw").type="text";
    if (document.getElementById(cl+"conpw")){
        document.getElementById(cl+"conpw").type="text";
    }
}
const non_vis = function(cl){
    document.getElementById("close").style.display="none";
    document.getElementById("open").style.display="block";
    document.getElementById(cl+"pw").type="password";
    if (document.getElementById(cl+"conpw")){
        document.getElementById(cl+"conpw").type="password";
    }
}
export {vis, non_vis}