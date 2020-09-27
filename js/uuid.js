function uuid() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = '7xxx-7xxx-3xxx-4xxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function SetCookie(name,value){
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "=" + escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name){
	var arr = document.cookie.match( new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr !=  null) return unescape(arr[2]);
	return null;
}