var p = document.getElementById("pic");  
var i = 0;
var pic;
var sa = document.getElementById("side");
var ca = document.getElementById("content");


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

function getXMLHttpRequest(){
    if (window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
    else{
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function getPic(){
    var xmlhttp = getXMLHttpRequest();
    var res;
    var jres;
    xmlhttp.open("GET","http://192.168.0.25:8888/showImages");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function(){
       if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
           jres = xmlhttp.responseText;
           res = JSON.parse(jres);
           console.log("pic");
           console.log(res);
           pic = res;
           next();
       }
    }
}

function getSide(){
    var xmlhttp = getXMLHttpRequest();
    var res;
    var jres;
    xmlhttp.open("GET","http://192.168.0.25:8888/showADBooks");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function(){
       if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
           jres = xmlhttp.responseText;
           res = JSON.parse(jres);
           console.log("side");
           console.log(res);
           for(var i = 0;i < res.length;i++){
               addside(res[i]);
           }
       }
    }
}

function getContent(){
    var childs = ca.childNodes; 
    for(var i = childs .length - 1; i >= 0; i--) {
        ca.removeChild(childs[i]);
    }
    var xmlhttp = getXMLHttpRequest();
    var res;
    var jres;
    xmlhttp.open("GET","http://192.168.0.25:8888/getBooks");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function(){
       if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
           jres = xmlhttp.responseText;
           res = JSON.parse(jres);
           console.log("content");
           console.log(res);
           for(var i = 0;i < 20;i++){
               addcontent(res[i]);
           }
           var pgdown = document.createElement("span");
           pgdown.innerHTML = "<input type='button' value='下一页' onclick='secpg()'>";
           ca.appendChild(pgdown);
       }
    }
}

function secpg(){
    var childs = ca.childNodes; 
    for(var i = childs .length - 1; i >= 0; i--) {
        ca.removeChild(childs[i]);
    }
    var xmlhttp = getXMLHttpRequest();
    var res;
    var jres;
    xmlhttp.open("GET","http://192.168.0.25:8888/getBooks");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function(){
       if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
           jres = xmlhttp.responseText;
           res = JSON.parse(jres);
           console.log("content");
           console.log(res);
           for(var i = 21;i < res.length;i++){
               addcontent(res[i]);
           }
            var pgup = document.createElement("span");
            pgup.innerHTML = "<input type='button' value='上一页' onclick='getContent()'>";
            ca.appendChild(pgup);
        }
    }
}

function next(){
    p.style.backgroundImage = "url(http://192.168.0.25:8888/"+pic[i].img+")";
    i++;
    if(i == pic.length){
        i = 0;
    }
    setTimeout("next()",3000);
}

function addside(obj){
    var book = document.createElement("div");
    var b_img = document.createElement("img");
    var b_name = document.createElement("p");
    var b_price = document.createElement("p");
    var b_like = document.createElement("p");

    b_img.src = "http://192.168.0.25:8888/" + obj.img;
    b_name.innerHTML = obj.name;
    b_price.innerHTML = "¥" + obj.price;
    b_like.innerHTML = "共 2w+ 评价"

    book.appendChild(b_img);
    book.appendChild(b_name);
    book.appendChild(b_price);
    book.appendChild(b_like);

    sa.appendChild(book);
}

function addcontent(obj){
    var book = document.createElement("div");
    var b_img = document.createElement("img");
    var b_name = document.createElement("p");
    var b_price = document.createElement("p");
    var b_like = document.createElement("p");
    var b_add = document.createElement("p");

    b_img.src = "http://192.168.0.25:8888/" + obj.img;
    b_name.innerHTML = obj.name;
    b_name.addEventListener("click",function(){toinf(obj)});
    b_price.innerHTML = "¥" + obj.price;
    b_like.innerHTML = "<span>自营</span> <span>放心购</span> <span>秒杀</span>";
    b_add.innerHTML = "<input type='button' value='加入购物车'>";
    b_add.addEventListener("click",function(){addtocart(obj)});

    book.appendChild(b_img);
    book.appendChild(b_name);
    book.appendChild(b_price);
    book.appendChild(b_like);
    book.appendChild(b_add);

    ca.appendChild(book);
}

function toinf(obj){
    localStorage.setItem("inf",JSON.stringify(obj));
    window.location.assign("inf.html");
}

function addtocart(obj){
    if(localStorage.getItem("user") != null){
        arrb.push(obj);
        arrbn.push(1);
        localStorage.setItem("book",JSON.stringify(arrb));
        localStorage.setItem("bookn",JSON.stringify(arrbn));
        alert("加入购物车成功！");
    }
    else{
        window.location.assign("login.html");
    }
}

getPic();
getSide();
getContent();


