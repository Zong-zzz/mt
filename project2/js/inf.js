var ii = JSON.parse(localStorage.getItem("inf"));

var pc = document.getElementById("pic");
var nm = document.getElementById("name");
var pr = document.getElementById("price");

pc.src = "http://192.168.0.25:8888/" + ii.img;
nm.innerHTML = ii.name;
pr.innerHTML = "¥" + ii.price;

if(localStorage.getItem("book") == null){
    localStorage.setItem("book",JSON.stringify([]));
}
if(localStorage.getItem("bookn") == null){
    localStorage.setItem("bookn",JSON.stringify([]));
}
var hel = document.getElementById("hello");
if(localStorage.getItem("user") != null){
    hel.innerHTML = "欢迎您，" + JSON.parse(localStorage.getItem("user")).username;
}

var arrb = JSON.parse(localStorage.getItem("book"));
var arrbn = JSON.parse(localStorage.getItem("bookn"));

function addtocart(){
    if(localStorage.getItem("user") != null){
        arrb.push(ii);
        arrbn.push(1);
        localStorage.setItem("book",JSON.stringify(arrb));
        localStorage.setItem("bookn",JSON.stringify(arrbn));
        alert("加入购物车成功！");
    }
    else{
        window.location.assign("login.html");
    }
}