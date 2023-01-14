/*$("body").click(function(){
  $(".vertical-menu.category_home.duplicate_links").css("height", "300px");
});*/


var isSlideShowRunning = false;
var adsData;

$(document).ready(function(e) {
setInterval(function(){
    $(".vertical-menu.category_home.duplicate_links").css("height", "269px");
    $(".vertical-menu.category_home.orignal_links").css("height", "265px");
if($('.selected_category.first').css('display') == 'block')
{

$(".yellow_border").css("height", "314px");
$(".category_home.info-box").attr('style', 'height: 316px !important;');
$(".forth_parthome").attr('style', 'height: 314px !important;');
$(".forth_parthome .yellow-bar").css({"height": "68px", "padding": "25px"});

}
else{
   
    $(".yellow_border").css({"height": "322px", "border":"0px !important;"});
$(".category_home.info-box").attr('style', 'height: 322px !important;');
$(".forth_parthome.mov_part").css("height", "326px !important;");
}
}, 10);





	$(".numberinput").forceNumeric();
	//showAds();

	$(".display-adds").off().on('click',function() {
		//isSlideShowRunning = ($("#ads-slide-show").is(":visible"));
		//If youtube is running then no need to show ads.
		
		if (adsData.length > 0) {
		
    		if($("#ads-slide-show").length > 0) {
    			//if($("#ads-slide-show").is(":visible"))
    			if(isSlideShowRunning)
    			{
    			 //   $('.row.head-btm>div').css('margin-top','0px');
    				$("#slider-imgs").hide();
    				$("#ads-slide-show").hide();
    				$('#ads-slide-show').get(0).slick.setPosition();
    				$(".home-tbl").show();
    			}
    			else
    			{
    				$(".home-tbl").hide();
    				// $('.row.head-btm>div').css('margin-top','-30px');
    				$("#slider-imgs").show();
    				$("#ads-slide-show").show();
    				$('#ads-slide-show').get(0).slick.setPosition();
    			}
    		}
    		else
    		{
    			if(isSlideShowRunning)
    			{
    				$("#slider-imgs").hide();
    				$("#no-adds").hide();
    				$(".home-tbl").show();
    			}
    			else
    			{
    				$(".home-tbl").hide();
    				$("#slider-imgs").show();
    				$("#no-adds").show();
    			}
    		}
    		isSlideShowRunning = !(isSlideShowRunning);
    		enableDisabledMajorMinorCityDropdown();
		}
	});
	

	$(document).on('click', '.masthead', function(e) {	
    	   	if($('#display-adds').css('display')=='block'){
    	   	 if($('#myModal').css('display')=='block'){
    	   	      if($(e.target).hasClass('close'))
    	   	      {
    	   	          	isSlideShowRunning = false;
        			$("#slider-imgs").hide();
        // 			$('.row.head-btm>div').css('margin-top','0px');
        			$("#ads-slide-show").hide();
        			$(".home-tbl").show();
        			enableDisabledMajorMinorCityDropdown();
    	   	      }
    	   	     
    	   	 }
    	   
        	 else
        	 {
        	      if(!(e.target.id == "display-adds" || e.target.tagName == "SELECT" || $(e.target).hasClass('slick-arrow') || $(e.target).parent().hasClass('image') || $(e.target).hasClass('close')))
        		{
        			isSlideShowRunning = false;
        			$("#slider-imgs").hide();
        // 			$('.row.head-btm>div').css('margin-top','0px');
        			$("#ads-slide-show").hide();
        			$(".home-tbl").show();
        			enableDisabledMajorMinorCityDropdown();
        			
        		}
        	 }
    	}
	});


	var login_data = JSON.parse(sessionStorage.getItem('login_data'));    

	if(login_data != null)
	{
		$('#state option[data-state-code="' + login_data.state + '"]').prop("selected",true);
		//$('#state').change();
		menulevel('#state');

		$('#city option[data-major-id="' + login_data.major_id + '"]').prop("selected",true);
		//$('#city').change();
		minorCity('#city');

		$('#minor option[data-minor-id="' + login_data.minor_id + '"]').prop("selected",true);
	}

	showAds();
});

function showTooltip()
{
    if (toolTipStatus) {
	    $(".viewad").fadeIn();
    }
}

function hideTooltip()
{
	$(".viewad").fadeOut();	
}
function showcommingsoon()
{
	$(".viewadsoon").fadeIn();
}

function hidecommingsoon()
{
	$(".viewadsoon").fadeOut();	
}
function validate(evt) {
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	var regex = /[0-9]|\./;
	if( !regex.test(key) ) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
	}
}

// forceNumeric() plug-in implementation
jQuery.fn.forceNumeric = function () {

	return this.each(function () {
		$(this).keydown(function (e) {
			var key = e.which || e.keyCode;

			if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
		 // numbers   
		 key >= 48 && key <= 57 ||
		 // Numeric keypad
		 key >= 96 && key <= 105 ||
		 // comma, period and minus, . on keypad
		 key == 190 || key == 188 || key == 109 || key == 110 ||
		 // Backspace and Tab and Enter
		 key == 8 || key == 9 || key == 13 ||
		 // Home and End
		 key == 35 || key == 36 ||
		 // left and right arrows
		 key == 37 || key == 39 ||
		 // Del and Ins
		 key == 46 || key == 45)
				return true;

			return false;
		});
	});
}

var timeout = 121000;
var timeoutTimer;

function startTimers() {
    
	timeoutTimer = setTimeout("idleTimeout()", timeout);
}

function resetTimers() {
	clearTimeout(timeoutTimer);
	startTimers();
}

function idleTimeout() {
 
	isSlideShowRunning = true;

	//If youtube is running then no need to show ads.
	if($("iframe").length > 0)
		return;

	if($("#ads-slide-show").length > 0){	
		$(".home-tbl").hide();
		$("#slider-imgs").show();
		$("#ads-slide-show").show();
		$('#ads-slide-show').get(0).slick.setPosition();
	}
	else
	{
		if(isSlideShowRunning)
		{
			$(".home-tbl").hide();
			$("#slider-imgs").show();
			$("#no-adds").show();
		}
		else
		{				
			$("#no-adds").hide();
			$(".home-tbl").show();
		}
	}
}

function enableDisabledMajorMinorCityDropdown()
{
	if($("#city").hasClass("custom-disabled"))
	{
		debugger;
		if(isSlideShowRunning)
		{
			$("#city,#minor").removeClass('select_disbled');
			$("#city,#minor").removeAttr("disabled");
		}
		else
		{
			$("#city,#minor").addClass('select_disbled');
			$("#city,#minor").attr('disabled','disabled');
		}
	}
}

function showAds(element , flag = 0)
{
    
    //$('#display-adds').css('display','block');
	/*var state = $("#state").find("option:selected").val();
	var major_city = $("#city").find("option:selected").val();
	var minor_city = $("#minor").find("option:selected").val();	*/
	enableDisabledMajorMinorCityDropdown();	
    if($("#city").find("option:selected")){ $('#display-adds').css('display','block'); }
	var state = $("#state").find("option:selected").attr("data-state-code");
	if (element && resetButtonClicked > 1) {
	    if (element.value === 'Nationwide' || element.value === undefined) {
	        state = 'Nationwide'
	    }
    }
	var major_city = $("#city").find("option:selected").attr("data-major-id");
	var minor_city = $("#minor").find("option:selected").attr("data-minor-id");
	getSliderAdds(state, major_city, minor_city , flag);
}

function getSliderAdds(state, major_city, minor_city , flag =0)
{
    if(flag==1)
    {
        var url = baseUrl + "pages/get_slider_ads_test";
    	var post_data =
    	{ 
    		state : state,
    		major_city : major_city,
    		minor_city : minor_city
    	}
    
    	$.ajax({
    		url: url,
    		type: "POST",
    		dataType: 'json',
    		data: post_data,
    		success: function (data) {
    		   $('#slider-imgs').html(data.msg);
    		   if(data.cat == false)
    		   {
    		
    		       if(flag == 0)
    		       {
    		           $('#slider-imgs').show();
    		           $(".home-tbl").hide();
    		       }
    		  
    		       
    		   }
    		   else
    		   {
    		       
    		       $('#slider-imgs').hide();
    		       $(".home-tbl").show();
    		       
    		      
    			if($('#ads-slide-show').length == 0){
    			    $('#ads-slide-show').html(' ');
    			}
    			else{
    			  showSlider();  
    			}
    		   }
    		
    			
    		}
    	});
    }
    else if(flag==0)
    {

        var url = baseUrl + "pages/get_slider_ads";
    	var post_data =
    	{ 
    		state : state,
    		major_city : major_city,
    		minor_city : minor_city
    	}
    
    	$.ajax({
    		url: url,
    		type: "POST",
    		dataType: 'json',
    		data: post_data,
    		success: function (data) {
    		    adsData = data.ads
    		   $('#slider-imgs').html(data.msg);
    		   if(data.cat == false)
    		   {
    		       if(flag == 0)
    		       {
    		           $('#slider-imgs').show();
    		           $(".home-tbl").hide();
    		           
    		       }
    		       
    		   }
    		   else
    		   {
    		       
    		       $('#slider-imgs').hide();
    		       $(".home-tbl").show();
    		       
    		      
    			if($('#ads-slide-show').length == 0){
    			    $('#ads-slide-show').html(' ');
    			}
    			else{
    			  showSlider();  
    			}
    		   }
    		
    			
    		}
    	});
    }
	
}


            function frontAdsModalClose() {
                $('#myModal').hide()
                setTimeout(
                    function() {
			            $('#display-adds').trigger('click');
                }, 10);
            }
            
function showSlider(flag = 0)
{

    if (adsData.length > 0) {
    	if($('#ads-slide-show').length > 0)
    	{
    		var rotationInterval = $('#ads-slide-show').attr("data-rotation-interval");
    		var slidesToShowAndScroll = parseInt($('#ads-slide-show').attr("data-slide-to-show"));
    
    		$('#ads-slide-show').slick({
    			lazyLoad: 'ondemand',
    			slidesToShow: slidesToShowAndScroll,
    			slidesToScroll: slidesToShowAndScroll,
    			autoplay: true,
    			autoplaySpeed: rotationInterval,
    		});
            
    		var modal = document.getElementById('myModal');
    		var modalImg = document.getElementById("imgAnggi");
    		var captionText = document.getElementById("caption");
    
    		$("div.image img").on('click',function(){ 
    			modal.style.display = "block";
    			var carousel = ''
    			
    			var srcImgClicked = $(this).attr("src")
    		    
    		    adsData.forEach((item) => {
    		        var srcImg = `${baseUrl}img/ads/${item.add_image_name}`
    		        carousel +=(`
        		        <div onclick="frontAdsModalClose()" class="item ${srcImg == srcImgClicked ? 'active' : ''}" style="margin-left: 300px">
                            <img class="img-responsive" src="${srcImg}" alt="..." style="width: 70%; max-height: 400px;">
                        </div>
    		        `)
    		    })
    		    
    		    carousel +=(`
        			<!--Carousel nav -->
        			<a class="carousel-control left" href="#myCarouselShowFront" data-slide="prev" style="margin-left: 310px">
        				<i class="fa fa-chevron-left" style="color: black"></i>
        			</a>
        			<a class="carousel-control right" href="#myCarouselShowFront" data-slide="next" style="margin-right: 320px">
        				<i class="fa fa-chevron-right" style="color: black"></i>
        			</a>
    		    `)
    		    
    		    $('#carouselInnerFrontAd').html(carousel)
    // 			modalImg.src = $(this).attr("src");
    			captionText.innerHTML = this.alt;
    		});
    
    		var span = document.getElementsByClassName("close")[0];
    
    		span.onclick = function() { 
    			modal.style.display = "none";
    		}
    
    		if(isSlideShowRunning)
    		{
    		   
    			$(".home-tbl").hide();
    			$("#slider-imgs").show();
    			$("#ads-slide-show").show();			
    			$('#ads-slide-show').get(0).slick.setPosition();
    		}
    	}
    	else
    	{
    		if(isSlideShowRunning)
    		{
    			$(".home-tbl").hide();
    			$("#slider-imgs").show();
    			$("#no-adds").show();
    		}
    		else
    		{				
    			$("#no-adds").hide();
    			$(".home-tbl").show();
    		}
    	}
    }
}
function mainCatesView(obj){
	if(obj == 'karaoke'){
		alert(obj);
	}
	
}
function logout()
{
	sessionStorage.removeItem('login_data');	
}
