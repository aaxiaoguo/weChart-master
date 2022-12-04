// TODO: 用户名称需修改为自己的名称
let userName = document.querySelector(".user-name");
userName.innerHTML = "guo";
// 朋友圈页面的数据  数组对象
var data =
	[
		{
			user: {
				name: "阳和",
				avatar: "./img/avatar2.png"
			},
			content: {
				type: 0, // 多图片消息
				text: "华仔真棒，新的一年继续努力！",//朋友圈发表的文字
				pics: ["./img/reward1.png", "./img/reward2.png", "./img/reward3.png", "./img/reward4.png"],//图片
				share: {},
				timeString: "3分钟前"
			},
			reply: {
				hasLiked: false,
				likes: ["Guo封面", "源小神"],
				comments: [{
					author: "Guo封面",
					text: "你也喜欢华仔哈！！！"
				}, {
					author: "喵仔zsy",
					text: "华仔实至名归哈"
				}]
			}
		},
		{
			user: {
				name: "伟科大人",
				avatar: "./img/avatar3.png"
			},
			content: {
				type: 1, // 分享消息
				text: "全民读书日",
				pics: [],
				share: {
					pic: "http://coding.imweb.io/img/p3/transition-hover.jpg",
					text: "飘洋过海来看你"
				},
				timeString: "50分钟前"
			},
			reply: {
				hasLiked: false,
				likes: ["阳和"],
				comments: []
			}
		},
		{
			user: {
				name: "深圳周润发",
				avatar: "./img/avatar4.png"
			},
			content: {
				type: 2, // 单图片消息
				text: "很好的色彩",
				pics: ["http://coding.imweb.io/img/default/k-2.jpg"],
				share: {},
				timeString: "一小时前"
			},
			reply: {
				hasLiked: false,
				likes: [],
				comments: []
			}
		},
		{
			user: {
				name: "喵仔zsy",
				avatar: "./img/avatar5.png"
			},
			content: {
				type: 3, // 无图片消息
				text: "以后咖啡豆不敢浪费了",
				pics: [],
				share: {},
				timeString: "2个小时前"
			},
			reply: {
				hasLiked: false,
				likes: [],
				comments: []
			}
		}
	];
// 相关 DOM
var $momentsList = $(".moments-list");


/**
 * 点赞内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function likesHtmlTpl(likes) {
	if (!likes.length) {
		return "";
	}
	var htmlText = ["<div class=\"reply-like\"><i class=\"icon-like-blue\"></i>"];
	// 点赞人的html列表
	var likesHtmlArr = [];
	// 遍历生成
	for (var i = 0, len = likes.length; i < len; i++) {
		likesHtmlArr.push("<a class=\"reply-who\" href=\"#\">" + likes[i] + "</a>");
	}
	// 每个点赞人以逗号加一个空格来相隔
	var likesHtmlText = likesHtmlArr.join(", ");
	htmlText.push(likesHtmlText);
	htmlText.push("</div>");
	return htmlText.join("");
}


/**
 * 评论内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function commentsHtmlTpl(comments) {
	if (!comments.length) {
		return "";
	}
	var htmlText = ["<div class=\"reply-comment\">"];
	for (var i = 0, len = comments.length; i < len; i++) {
		var comment = comments[i];
		htmlText.push("<div class=\"comment-item\"><a class=\"reply-who\" href=\"#\">" + comment.author + "</a>：" + comment.text + "</div>");
	}
	htmlText.push("</div>");
	return htmlText.join("");
}

/**
 * 评论点赞总体内容 HTML 模板
 * @param {Object} replyData 消息的评论点赞数据
 * @return {String} 返回html字符串
 */
function replyTpl(replyData) {
	var htmlText = [];
	htmlText.push("<div class=\"reply-zone\">");//评论列表开始
	htmlText.push(likesHtmlTpl(replyData.likes));
	htmlText.push(commentsHtmlTpl(replyData.comments));//评论列表结束
	htmlText.push("</div>");
	return htmlText.join("");
}

/******************************************3种消息展示start(第四种为空)*************************************************************/
/**
 * 多张图片消息模版
 * @param {Object} pics 多图片消息的图片列表
 * @return {String} 返回html字符串
 */
function multiplePicTpl(pics) {
	var htmlText = [];
	htmlText.push("<ul class=\"item-pic\">");
	for (var i = 0, len = pics.length; i < len; i++) {
		htmlText.push("<img class=\"pic-item\" src=\"" + pics[i] + "\">");
	}
	htmlText.push("</ul>");
	return htmlText.join("");
}

/**
 * 分享消息模版
 * @param {Object} share 分享
 * @return {String} 返回html字符串
 */
function shareTpl(share) {
	var htmlText = [];
	htmlText.push("<div class=\"item-share\">");
	htmlText.push("<img class=\"share-img\"  src=\"" + share.pic + "\">");
	htmlText.push("<p class=\"share-tt\">" + share.text + "</p>");
	htmlText.push("</div>");
	return htmlText.join("");
}

/**
 * 单图片消息模版
 * @param {Object} pics 分享
 * @return {String} 返回html字符串
 */
function onlyImgTpl(pics) {
	var htmlText = [];
	htmlText.push("<img class=\"item-only-img\"  src=\"" + pics[0] + "\">");
	return htmlText.join("");
}

//*****************************************3种消息展示end(第四种为空)******************************************************
/**
 * 循环：消息体
 * @param {Object} messageData 对象
 */
function messageTpl(messageData) {
	var user = messageData.user;
	var content = messageData.content;
	var reply = messageData.reply;
	var htmlText = [];

	htmlText.push("<div class=\"moments-item\" data-index=\"0\">");
	htmlText.push("<a class=\"item-left\" href=\"#\">");
	htmlText.push("<img src=\"" + user.avatar + "\" width=\"42\" height=\"42\" alt=\"\"/>");
	htmlText.push("</a>");
	htmlText.push("<div class=\"item-right\">");
	htmlText.push("<a href=\"#\" class=\"item-name\">" + user.name + "</a>");
	htmlText.push("<p class=\"item-msg\">" + content.text + "</p>");
	var contentHtml = "";
    /* +++++ */
	switch (content.type) {
		// 多图片消息
		case 0:
			contentHtml = multiplePicTpl(content.pics);
			break;
		case 1:
			// TODO: 实现分享消息
			contentHtml = shareTpl(content.share);
			break;
		case 2:
			// TODO: 实现单张图片消息
			contentHtml = onlyImgTpl(content.pics);
			break;
		case 3:
			// TODO: 实现无图片消息
			contentHtml = " ";
			break;
	}
	htmlText.push(contentHtml);
	htmlText.push("<div class=\"item-ft\">");
	htmlText.push("<span class=\"item-time\">" + content.timeString + "</span>");
	htmlText.push("<div class=\"item-reply-bg\">");
	htmlText.push("<div class=\"item-reply-touchUp\">");
	htmlText.push("<div class=\"icon-like\">" + "</div>");
	htmlText.push("<div class=\"item-reply-iconName\">" + "点赞" + "</div>");
	htmlText.push("</div>");
	htmlText.push("<div class=\"item-reply-touchComment\">");
	htmlText.push("<div class=\"icon-comment\">" + "</div>");
	htmlText.push("<div class=\"item-reply-iconName\">" + "评论" + "</div>");
	htmlText.push("</div></div>");
	htmlText.push("<div class=\"item-reply-btn\">");
	htmlText.push("<span class=\"item-reply\"></span>");
	htmlText.push("</div></div>");
	htmlText.push(replyTpl(messageData.reply));
	htmlText.push("</div></div>");
	return htmlText.join("");
}


/**
 * 页面渲染函数：render +++
 */
function render() {
	// 展示data数组中的所有消息数据。
	// var messageHtml=null;
	var messageHtml = "";
	for (var i = 0, len = data.length; i < len; i++) {
		console.log(data[i]);
		messageHtml += messageTpl(data[i]);
	}
	// console.log("messageHtml:",messageHtml);
	const oDiv = document.querySelector(".moments-list");
	console.log(oDiv);
	// $momentsList.html(messageHtml);
	oDiv.innerHTML = messageHtml;
}


/* 
*按钮弹出功能
*/
function replyPopup() {
	let replyBtn = document.querySelectorAll(".item-reply-btn");
	let replyBg = document.querySelectorAll(".item-reply-bg");
	for(let i = 0; i<replyBtn.length; i++) {
		replyBtn[i].onclick = function () {	
			/* for(var i = 0; i <replyBtn.length;i++ )
				replyBg[i].style.marginRight = '-152px'; */
				replyBg[i].style.marginRight = '38px';	
		}
		/* replyBg[i].style.marginRight = '38px'; */
	}
	var body= document.querySelector('body');
    /* body.addEventListener ('click',function() {
			for(let i = 0; i<replyBtn.length; i++){
			replyBg[i].style.marginRight = '-152px';	

		}
	},false) */

}

/* 
*点赞功能
*/
function touchUp() {
     var replyTouchUp = document.querySelectorAll('.item-reply-touchUp');
	 var text = document.querySelectorAll('.item-reply-touchUp .item-reply-iconName');
	 var len =  replyTouchUp.length;
	 var j = 0;
	 for(let i = 0; i < len; i++) {
		replyTouchUp[i].addEventListener('click',function () {
			/* text[j].innerHTML == '取消'? text[j].innerHTML = '点赞' : text[j].innerHTML = '取消';
			j++;
			data[0].reply.likes = ["Guo封面", "源小神","guo"]
			 */
			text[i].innerHTML = '取消';
			j++;
		})
	 }
}

/**
 * 发表评论函数
 * */
function touchComment() {
    var replytouchComment = document.querySelectorAll('.item-reply-touchComment');
	var box = document.querySelector('.review-box-Shell');
	console.log(replytouchComment);
	console.log(box);
	var len = replytouchComment.length;
	var j = 0;
	for( var i = 0 ; i < len; i++ ) {
		replytouchComment[i].addEventListener('click', function () {
			box.style.display = 'block';
		})
	}
}

//发送按钮点击后触发的事件
function sentMsg() {

}

//监听评论发送按钮的状态
function listenInput() {

}

//图片点击
function touchImg() {
     var imgOut  = document.querySelector('.bg-img-out');
	 var imgs = document.querySelectorAll('.pic-item')
	 console.log(imgOut);
	 console.log(imgs);
	 imgs[0].onclick = function() {
		imgOut.style.display = 'block'
	 }
}

/*************************************************************************************************************************/
/**
 * 页面绑定事件函数：bindEvent
 */
function bindEvent() {
	// TODO: 完成页面交互功能事件绑定
	touchUp();
	replyPopup();
	touchComment();
	touchImg();
}

/**
 * 页面入口函数：init
 * 1、根据数据页面内容
 * 2、绑定事件
/*  */

function init() {
	// 1.渲染页面
	render();
	//2.页面交互功能事件的绑定
	bindEvent();
	/* 
	 * touchUp()
	 * replyPopup() 按钮弹出功能
	 * touchComment()
	 */
}

// 总入口
init();
