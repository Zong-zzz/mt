if(localStorage.getItem("user") == null){
    window.location.assign("login.html");
}

if(localStorage.getItem("number") == null){
    localStorage.setItem("number",0);
}
var hel = document.getElementById("hello");
if(localStorage.getItem("user") != null){
    hel.innerHTML = "欢迎您，" + JSON.parse(localStorage.getItem("user")).username;
}

var all = document.getElementsByClassName("all");
var cart_num = document.getElementById("cart_num");
var tab = document.getElementById("tab");
var arrbooks = JSON.parse(localStorage.getItem("book"));
var arrbookn = JSON.parse(localStorage.getItem("bookn"));
var bill = document.getElementById("total");

download();
function download(){
    var lnl = arrbooks.length;
    for(var i = 0;i < lnl;i++){
        addCart(i);
    }
}
function addCart(n){
    var tr = tab.insertRow(-1);
    var tdcheck = tr.insertCell(0);
    tdcheck.innerHTML = '<input type="checkbox" name="" class="all" onclick="addcheck(this)">';
    var tdname = tr.insertCell(1);
    var cpc = document.createElement("img");
    cpc.src = "http://192.168.0.25:8888/" + arrbooks[n].img;
    cpc.style.width = '100px';
    cpc.style.height = '100px';
    tdname.appendChild(cpc);
    var cn = document.createElement("p");
    cn.innerHTML = arrbooks[n].name;
    tdname.appendChild(cn);
    cn.style.fontSize = '14px';
    var tdprice = tr.insertCell(2);
    tdprice.innerHTML = arrbooks[n].price;
    var tdnum = tr.insertCell(3);
    var a1 = [];
    a1[n] = arrbookn[n];
    tdnum.innerHTML = '<input type="button" value="-" class="dx"><span>' + a1[n] + '</span><input type="button" value="+" class="ax">';
    var dx = document.getElementsByClassName("dx");
    var ax = document.getElementsByClassName("ax");
    for(var i = 0;i < dx.length;i++){
        dx[i].index = i;
        ax[i].index = i;
        dx[i].onclick = function(){
            arrbookn[this.index]--;
            localStorage.setItem("bookn",JSON.stringify(arrbookn));
            this.nextSibling.innerHTML = arrbookn[this.index];
            this.parentNode.nextSibling.innerHTML = Number(this.parentNode.previousSibling.innerText) * Number(arrbookn[this.index]);
            paybill();
        }
        ax[i].onclick = function(){
            arrbookn[this.index]++;
            localStorage.setItem("bookn",JSON.stringify(arrbookn));
            this.previousSibling.innerHTML = arrbookn[this.index];
            this.parentNode.nextSibling.innerHTML = Number(this.parentNode.previousSibling.innerText) * Number(arrbookn[this.index]);
            paybill();
        }
    }
    var tdsmtotal = tr.insertCell(4);
    tdsmtotal.innerHTML = Number(arrbooks[n].price) * Number(arrbookn[n]);
    var tdoper = tr.insertCell(5);
    tdoper.innerHTML = '<input type="button" value="删除" class="delR">';
    var dd = document.getElementsByClassName("delR");
    for(var i = 0;i < dd.length;i++){
        dd[i].onclick = function(){
            var flag = confirm("确定要删除吗？")
            if(flag){
                deleteRow(this);
                paybill();
            }
        }
    }
}

function deleteRow(r){
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("tab").deleteRow(i);
    arrbooks.splice(i - 1,1);
    arrbookn.splice(i - 1,1);
    localStorage.setItem("book",JSON.stringify(arrbooks));
    localStorage.setItem("bookn",JSON.stringify(arrbookn));
    location.reload();
}

function slcAll(checkbox){
    for(var i = 0;i < all.length;i++){
        if(checkbox.checked){
            all[i].checked = checkbox.checked;
            localStorage.setItem("number",JSON.parse(localStorage.getItem("number")) + 1);
            cart_num.innerHTML = JSON.parse(localStorage.getItem("number"));
        }
        else{
            all[i].checked = checkbox.checked;
            localStorage.setItem("number",JSON.parse(localStorage.getItem("number")) - 1);
            cart_num.innerHTML = JSON.parse(localStorage.getItem("number"));
        }
    }
    paybill();    
}

function delslc(){
    var flag = confirm("确定要删除购物车中所有选中的订单吗?");
    if(flag){
        for(var i = all.length - 1;i >= 0;i--){
            if(all[i].checked){
                deleteRow(all[i]);
                localStorage.setItem("number",localStorage.getItem("number") - 1);
            }
        }
        alert("删除成功！");
        cart_num.innerHTML = JSON.parse(localStorage.getItem("number"));
        paybill();
    }
}

function delall(){
    for(var i = all.length - 1;i >= 0;i--){
        deleteRow(all[i]);
        localStorage.setItem("number",localStorage.getItem("number") - 1);
    }
    alert("删除成功！");
    cart_num.innerHTML = JSON.parse(localStorage.getItem("number"));
    paybill();
}

function paybill(){
    bill.innerHTML = totalbill();
}

function addcheck(obj){
    if(obj.checked){
        localStorage.setItem("number",JSON.parse(localStorage.getItem("number")) + 1);
        cart_num.innerHTML = JSON.parse(localStorage.getItem("number"));
    }
    else{
        localStorage.setItem("number",JSON.parse(localStorage.getItem("number")) - 1);
        cart_num.innerHTML = JSON.parse(localStorage.getItem("number"));
    }
    paybill();
}

function totalbill(){
    var y = document.getElementById("sa");
    var total = 0;
    var flag = [];
    for(var i = 0;i < all.length;i++){
        if(all[i].checked){
            total += Number(all[i].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerText);
            flag[i] = true;
        }
        else{
            flag[i] = false;
        }
    }
    y.checked = true;
    for(var j = 0;j < flag.length;j++){
        if(flag[j] == false){
            y.checked = false;
            break;
        }
    }
    return total;
}

function buy(){
    paybill();
    alert("总共付款" + totalbill() + "元");
    for(var i = all.length - 1;i >= 0;i--){
        if(all[i].checked){
            deleteRow(all[i]);
            localStorage.setItem("number",JSON.parse(localStorage.getItem("number")) - 1);
        }
    }
    cart_num.innerHTML = 0;
    paybill();
}
