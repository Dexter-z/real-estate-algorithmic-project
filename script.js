const menuButton = document.getElementById("menuButton");
const navlinks = document.getElementById("navlinks");
menuButton. addEventListener("click") , function() {
    navlinks. classList.toggle("active");
} 
const links =document.querySelectorAll("navlinks a");{
    links.addEventListener("click"), function(){
        navlinks.classList.remove("active");
    }
}
