var o = document.getElementById("order");
var c = document.getElementById("cart");
var all = document.getElementsByClassName("all");
//购物车
var cart_num = document.getElementById("cart_num");
cart_num.innerHTML = localStorage.getItem("number");
var tab = document.getElementById("tab");
var arrfoods = JSON.parse(localStorage.getItem("loc_food"));

download();
function download(){
    var lnl = arrfoods.length;
    for(var i = 0;i < lnl;i++){
        addCart(i);
    }
}
function addCart(n){
    var tr = tab.insertRow(-1);
    var tdcheck = tr.insertCell(0);
    tdcheck.innerHTML = '<input type="checkbox" name="" class="all" onclick="addcheck()">';
    var tdname = tr.insertCell(1);
    tdname.innerHTML = arrfoods[n].Name;
    var tdprice = tr.insertCell(2);
    tdprice.innerHTML = arrfoods[n].Price;
    var tdnum = tr.insertCell(3);
    var a1 = [];
    a1[n] = arrfoods[n].Num;
    tdnum.innerHTML = '<input type="button" value="-" class="dx"><span>' + a1[n] + '</span><input type="button" value="+" class="ax">';
    var dx = document.getElementsByClassName("dx");
    var ax = document.getElementsByClassName("ax");
    for(var i = 0;i < dx.length;i++){
        dx[i].index = i;
        ax[i].index = i;
        dx[i].onclick = function(){
            arrfoods[this.index].Num--;
            localStorage.setItem("loc_food",JSON.stringify(arrfoods));
            this.nextSibling.innerHTML = arrfoods[this.index].Num;
            addcheck();
        }
        ax[i].onclick = function(){
            arrfoods[this.index].Num++;
            localStorage.setItem("loc_food",JSON.stringify(arrfoods));
            this.previousSibling.innerHTML = arrfoods[this.index].Num;
            addcheck();
        }
    }
    var tdoper = tr.insertCell(4);
    tdoper.innerHTML = '<input type="button" value="删除" class="delR">';
    var dd = document.getElementsByClassName("delR");
    for(var i = 0;i < dd.length;i++){
        dd[i].onclick = function(){
            var flag = confirm("确定要删除吗？")
            if(flag){
                deleteRow(this);
                cart_num.innerHTML = localStorage.getItem("number");
                addcheck();
            }
        }
    }
}

function deleteRow(r){
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("tab").deleteRow(i);
    arrfoods.splice(i - 1,1);
    localStorage.setItem("loc_food",JSON.stringify(arrfoods));
    localStorage.setItem("number",localStorage.getItem("number") - 1);
}

function slcAll(checkbox){
    for(var i = 0;i < all.length;i++){
        all[i].checked = checkbox.checked;
    }
    addcheck();    
}

function delslc(){
    var flag = confirm("确定要删除购物车中所有选中的订单吗?");
    if(flag){
        for(var i = all.length - 1;i >= 0;i--){
            if(all[i].checked){
                deleteRow(all[i]);
            }
        }
        cart_num.innerHTML = localStorage.getItem("number");
        alert("删除成功！");
        addcheck();
    }
}

function addcheck(){
    var bill = document.getElementById("total");
    bill.innerHTML = totalbill();
}

function totalbill(){
    var y = document.getElementById("sa");
    var total = 0;
    var flag = [];
    for(var i = 0;i < all.length;i++){
        if(all[i].checked){
            total += Number(all[i].parentNode.nextSibling.nextSibling.innerText) * Number(all[i].parentNode.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.innerText);
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
    addcheck();
    alert("总共付款" + totalbill() + "元");
    for(var i = all.length - 1;i >= 0;i--){
        if(all[i].checked){
            deleteRow(all[i]);
        }
    }
    cart_num.innerHTML = localStorage.getItem("number");
    addcheck();
}

function cartOpen(){
    window.location.assign("cart.html");
}

function cartClose(){
    window.location.assign("index.html");
}

//剩下的问题：
//删除完全选不能消除
//同名添加不叠加

//函数参数的范围，相同功能语句的调用，细节

//删除时考虑先清光再加载缓存add进去，可以提高复用性

//