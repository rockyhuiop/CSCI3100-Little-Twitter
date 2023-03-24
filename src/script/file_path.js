export const file_path = () =>{
    var file=document.getElementById("hp-addtw-file");
    var file_des=document.getElementById("hp-addtw-file-des");
    file.addEventListener("change", function(){
        if (file.value){
            file_des.innerHTML=file.value.split("\\").slice(-1);
        } else{
            file_des.innerHTML="No media has been chosen";
        }    
    });
}