const width = 20,height = 20,size = 20;

// 蛇身数组
let snackArr = [];

// 食物坐标
let foodX,foodY;

// 蛇头方向
let direction = [1,0];

// 出界弹框消失
let interval;


window.onload = function(){
	let mapdom = document.getElementById('map');
	mapdom.style.width = width * size + 'px';
	mapdom.style.height = height * size + 'px';
	init();

	// 定时移动
	interval =  setInterval(function() {
	// 出界
	chech();

	// 吃到自己
	 checkself();

	// 食物
	if(isfood()) {
		createfood();
		addbody();
	}

	// 渲染蛇
	let snackhtml = '';
	for(let i = 0;i<snackArr.length;i++) {
		snackhtml += '<div class="snakbody" style="left: '+ snackArr[i].x * size +'px; top:'+ snackArr[i].y * size +'px"></div>'
	}

	// 渲染食物
		snackhtml += '<div class="food" style="left: '+ foodX * size +'px; top:'+ foodY * size +'px"></div>'
	
	// 渲染蛇身
	mapdom.innerHTML = snackhtml;
	
	// 移动
	move();
	},200)
}





// 键盘事件
document.onkeydown = function(e) {
	// console.log(e.keyCode)
	switch (e.keyCode) {
		case 37 : if (direction[0] !=1 ) {direction = [-1, 0]} break;
		case 38 : if (direction[1] != 1) {direction = [0, -1]} break;
		case 39 : if (direction[0] != -1) {direction = [1, 0]} break;
		case 40 : if (direction[1] != -1) {direction = [0, 1]} break;
	}
}




// 初始化蛇身
function init(){
	snackArr[0] = {x:5, y:4};
	snackArr[1] = {x:4, y:4};
	snackArr[2] = {x:3, y:4};
	createfood();
}




// 生成食物
function createfood() {
	foodX = Math.floor(Math.random() * width);
	foodY = Math.floor(Math.random() * height);
}




// 移动蛇
function move() {
	// 使蛇后一节的坐标等于前一节
	for(let i = snackArr.length-1;i>0;i--) {
		snackArr[i].x = snackArr[i - 1].x;
		snackArr[i].y = snackArr[i - 1].y;
 	}
 	// 蛇头向前一步
 	snackArr[0].x += direction[0];
 	snackArr[0].y += direction[1];

}




// 判断是否出界
function chech() {
	// 蛇头
	let snackheader = snackArr[0];
	if(snackheader.x < 0 || snackheader.y <0 || snackheader.x >= width || snackheader.y >= height) {
		alert("出界");
		clearInterval(interval);
	}
}




// 蛇吃到食物
function isfood() {
	// 蛇头
	let snackheader = snackArr[0];
	if(snackheader.x == foodX && snackheader.y == foodY) return true;
}




// 在蛇最后加一节
function addbody() {
	let lastbody = snackArr[snackArr.length - 1];
	snackArr.push({x: lastbody.x, y: lastbody.y});
}





// 判断蛇是否吃到自己
function checkself() {
	// 蛇头
	let snackheader = snackArr[0];
	for(let i = 1;i<snackArr.length;i++) {
		if(snackArr[i].x == snackheader.x && snackArr[i].y == snackheader.y) {
			alert("game over!!");
			clearInterval(interval);
		}
	}
}