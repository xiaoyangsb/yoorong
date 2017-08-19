var flag1=false;
var flag2=false;
$.ajaxSetup({  
    contentType: "application/json; charset=utf-8"  
});  
var DataDeal = {  
//将从form中通过$('#form').serialize()获取的值转成json  
   formToJson: function (data) {  
       data=data.replace(/&/g,"\",\"");  
       data=data.replace(/=/g,"\":\"");  
       data="{\""+data+"\"}";  
       return data;  
    } 
}

//验证
$('#name').blur(function(){
	if ($(this).val().length>=2) {
		flag1=true;
		$('#nameremind').text('√').removeClass('red').addClass('green');
		

	} else {
		flag1=false;
		$('#nameremind').text('×').removeClass('green').addClass('red');
	}
})

$('#telephone').blur(function(){
	if (/^1[3|4|5|7|8]\d{9}$/.test($(this).val())) {
		flag2=true;
		$('#telephoneremind').text('√').removeClass('red').addClass('green');
		
	} else {
		flag2=false;
		$('#telephoneremind').text('×').removeClass('green').addClass('red');
	}
})


 
$('button').click(function(){
	console.log(flag1);
	console.log(flag2);
	if (flag1&&flag2) {
		var data=$('#form').serialize();
		data=decodeURIComponent(data,true);//防止中文乱码
		var param=DataDeal.formToJson(data);
		$.ajax({
			url: "http://106.15.194.162/api/v1/message/",
			type: "post",
			data: param,
			success: function(data){
				alert('提交成功了');
			},
			error: function(){
				alert('未能提交成功');
			}
		})
	} else {
		alert("您填写的姓名或电话不正确请重新填写！");
        return false;
	}
	$('#form').get(0).reset();
})









