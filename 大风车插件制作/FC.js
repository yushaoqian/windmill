var FC=(function(undefined){
	//这样能防止顾客自己的变量被污染
	var curIndex=1;
	function P(x,y,flag){
			this['backgroundPosition-x']=x+'%';
			this['backgroundPosition-y']=y+'%';
		}
		var POSITION={
			PART1:{BEGIN:new P(0,0),END:new P(0,-100)},
			PART2:{BEGIN:new P(100,0),END:new P(200,0)},
			PART3:{BEGIN:new P(0,100),END:new P(-100,100)},
			PART4:{BEGIN:new P(100,100),END:new P(100,200)}
		};
	var fcHtml="<div id='fc-con'>\
		<div class='fc-part fc-part1'></div>\
		<div class='fc-part fc-part2'></div>\
		<div class='fc-part fc-part3'></div>\
		<div class='fc-part fc-part4'></div>\
		<span class='fc-left'>&lt;</span>\
		<span class='fc-right'>&gt;</span>\
	</div>";
	return function(config){
		$(config.sel).html(fcHtml);//初始化FC需要的html
		$('#fc-con').css('background-image',
				'url('+config.picPaths[curIndex-1]+')');
			$('#fc-con>span').on('click',function(){
				if($('#fc-con').css('animationName')=='fc-show')
					return;//防止连续快速点击
				//退场动画
				$(this).siblings('.fc-part').css({
					'backgroundImage':'url('+config.picPaths[curIndex-1]+')'
				}).each(function(i,v){
					$(v).css(POSITION['PART'+(i+1)].BEGIN)
					.animate(POSITION['PART'+(i+1)].END,800);
				});
				//进场动画
				curIndex=curIndex+1>config.picPaths.length?1:curIndex+1;
				$(this).parent().css({
					'backgroundImage':'url('+config.picPaths[curIndex-1]+')',
					'animationName':'fc-show'
				});
				setTimeout(function(){
					$('#fc-con').css({'animationName':''});
				},900);
			});
	};
})();