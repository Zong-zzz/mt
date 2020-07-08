var o = document.getElementById("order");
var c = document.getElementById("cart");
var all = document.getElementsByClassName("all");
// 点餐
    // 添加节点
function addFood(n){
        //创建元素
var food = document.createElement("div");
var f_img = document.createElement("img");
var f_ul1 = document.createElement("ul");
var f_name = document.createElement("li");
var f_price = document.createElement("li");
var f_monthlysold = document.createElement("p");
var f_ul2 = document.createElement("ul");
var f_startcost = document.createElement("li");
var f_fee = document.createElement("li");
var f_time = document.createElement("li");
var f_add = document.createElement("p");
        //分配属性
f_img.src = foods[n].Img;
f_name.innerHTML = foods[n].Name;
f_price.innerHTML = foods[n].Price + "元/份";
f_monthlysold.innerHTML = "月销" + foods[n].MonthlySold + "单";
f_startcost.innerHTML = "起送￥" + foods[n].StartCost;
f_fee.innerHTML = "免配送费";
f_time.innerHTML = foods[n].Time + "分钟";
f_add.innerHTML = '<input type="button" value="加入购物车" onclick="upload('+n+')">';
        //元素封装
f_ul1.appendChild(f_name);
f_ul1.appendChild(f_price);
f_ul2.appendChild(f_startcost);
f_ul2.appendChild(f_fee);
f_ul2.appendChild(f_time);
food.appendChild(f_img);
food.appendChild(f_ul1);
food.appendChild(f_monthlysold);
food.appendChild(f_ul2);
food.appendChild(f_add);
return food;
}
    //调用添加
var l1 = document.getElementById("line1");
var l2 = document.getElementById("line2");
for(var i = 0;i < 4;i++){
    l1.appendChild(addFood(i));
}
for(var i = 4;i < 8;i++){
    l2.appendChild(addFood(i));
}

var cart_num = document.getElementById("cart_num");
cart_num.innerHTML = localStorage.getItem("number");

function cartOpen(){
    window.location.assign("cart.html");
}

function cartClose(){
    window.location.assign("index.html");
}

if(localStorage.getItem("loc_food") == null){
    localStorage.setItem("loc_food",JSON.stringify([]));
}
var arrr = JSON.parse(localStorage.getItem("loc_food"));
function upload(n){
    var al = arrr.length + 1;
    arrr.push(foods[n]);
    localStorage.setItem("loc_food",JSON.stringify(arrr));
    localStorage.setItem("number",al);
    cart_num.innerHTML = localStorage.getItem("number");
    alert("加入购物车成功！");
}

//剩下的问题：
//删除完全选不能消除
//同名添加不叠加

//函数参数的范围，相同功能语句的调用，细节