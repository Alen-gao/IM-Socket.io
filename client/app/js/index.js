// var fs = require('fs');
// 点击表情不失焦点测试
$(document).on('click', '.J-EditItem', function(){
	var test = $(this).attr('class') + ' ; ';
	insertImage(test);
});

// 初始化光标位置
function insertImage(html){
    // restoreSelection();
    if(document.selection)
        currentRange.pasteHTML(html); 
    else{
        $('.textarea').focus();
        document.execCommand("insertImage", false,html);
        currentRange.collapse();
    }
    saveSelection();
}


// const ipcRenderer = require('electron').ipcRenderer;
document.getElementById('file').addEventListener('change', function(event){
	
	var formData = new FormData();
	formData.append("file", document.getElementById('file').files[0]);  

   // var data = new FormData();
   // var files = $('#file')[0].files;
   //  console.log('files', files[0]);
   // if (files) {
   //  data.append('codecsv',files[0]);
   // }        
             
	 $.ajax({    
	    url:'http://127.0.0.1:3000/file-upload',    
	    type: 'post',  
	    dataType: 'json',  
	    data : formData,
	    cache: false,
	    contentType: false,  
		processData: false,  
	    success: function(data){
	    	//回调函数
	    	if (data.ok==1){
	    		var path = 'http://127.0.0.1:3000/' + data.result.path;
	    	}
	    	var section = document.createElement('div'); //<img src="'+path+'" />
			var contentDiv = '<span class="user-img"><img src="img/04.gif"></span><div class="mess-cont">'+
							 '<div class="file-cont"><p><span class="file-ico"></span></p><a class="download" href="'+path+'" data-path="'+path+'">下载</a>'+
							 '<p class="file-bot"></p></div></div>';
			section.className = 'mess-right';
			section.innerHTML = contentDiv;
			document.getElementById("message").appendChild(section);
	    	console.log('data', data);
	    } 
	}); 
});

// $(document).on('click', '.download', function(){
// 	var path = $(this).data('path');
// 	var pdf = fs.createReadStream(path);
     
//     res.writeHead(200, {
//       'Content-Type': 'application/force-download',
//       'Content-Disposition': 'attachment; filename=test.rar'
//       });
       
//     pdf.pipe(res);
// });
$(document).on('click', '.close-win', function(){
	//关掉聊天窗口
	ipcRenderer.send('close-main');

}).on('click', '.min-win', function(){
	//最小化聊天窗口
	ipcRenderer.send('min-main');

}).on('click', '.max-win', function(){
	//最大化聊天窗口
	ipcRenderer.send('max-main');

});

