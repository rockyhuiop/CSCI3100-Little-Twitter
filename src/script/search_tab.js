export const search_tab = (tab) =>{
    
    var all_tab=document.getElementsByClassName("hp-search-tab")[0].getElementsByTagName("button");
    var all_tab_con=document.getElementsByClassName("hp-search-con");
    for (var i=0;i<all_tab.length;i++){
        all_tab[i].classList.remove("hp-search-active")
    }
    all_tab[tab].classList.add("hp-search-active");
    for (var i=0;i<all_tab_con.length;i++){
        all_tab_con[i].classList.remove("hp-search-con-active");
    }
    all_tab_con[tab].classList.add("hp-search-con-active");
    
}