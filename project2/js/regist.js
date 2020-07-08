function checkUsername(obj){
    setMessage(/^1(3|5|7|8)\d{9}$/.test(obj.value)||/^[\d a-z A-Z \_]{2,8}@[\d a-z A-Z]{3,6}\.com$/.test(obj.value),obj)
}

function checkPassword(obj){
    setMessage(/^[a-z A-Z \d]{8,10}$/.test(obj.value),obj)
}

function setMessage(flag,obj){
    if(flag){
        obj.nextSibling.innerHTML="√"
        obj.nextSibling.style.color="green"
    }else{
        obj.nextSibling.innerHTML="×"
        obj.nextSibling.style.color="red"
    }
}

function checkRePassword(obj){
    setMessage(obj.value==document.getElementById("p").value,obj)
}

function getXMLHttpRequest(){
    if (window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
    else{
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function regist(){
    if(checkRight()){
        var xmlhttp = getXMLHttpRequest();
        var usn = document.getElementById("n").value;
        var psw = document.getElementById("p").value;
        // var user = {username:document.getElementById("n").value,password:document.getElementById("p").value};
        xmlhttp.open("POST","http://192.168.0.25:8888/regsterUser");
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("username=" + usn +"&password=" + psw);
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                var res = xmlhttp.responseText;
                console.log(res);
                alert("注册成功！")
            }
        }
    }
}

function checkRight(){
    var spans= document.getElementsByTagName("span");
    var flag=true;
    for(var i=0;i<spans.length;i++){
        if(spans[i].innerHTML=='×'){
            flag=false;
            break;
        }
    }
    return flag;
}