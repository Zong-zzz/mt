function getXMLHttpRequest(){
    if (window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
    else{
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function checkUser(){
    var xmlhttp = getXMLHttpRequest();
    var usn = document.getElementById("n").value;
    var psw = document.getElementById("p").value;
    xmlhttp.open("POST","http://192.168.0.25:8888/login");
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("username=" + usn +"&password=" + psw);
    xmlhttp.onreadystatechange = function(){
       if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
           var res = xmlhttp.responseText;
           console.log(res);
           localStorage.setItem("user",res);
           alert("登录成功！")
           window.location.assign("index.html");
       }
    }
}