// JavaScript Document

$(document).ready(function() {

	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function() {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
		panel.style.maxHeight = null;
		} else {
		panel.style.maxHeight = panel.scrollHeight + "px";
		} 
	});
	}

	(function($) { // Begin jQuery
		$(function() { // DOM ready
		  // If a link has a dropdown, add sub menu toggle.
		  $('nav ul li a:not(:only-child)').click(function(e) {
			$(this).siblings('.nav-dropdown').toggle();
			// Close one dropdown when selecting another
			$('.nav-dropdown').not($(this).siblings()).hide();
			e.stopPropagation();
		  });
		  // Clicking away from dropdown will remove the dropdown class
		  $('html').click(function() {
			$('.nav-dropdown').hide();
		  });
		  // Toggle open and close nav styles on click
		  $('#nav-toggle').click(function() {
			$('nav ul').slideToggle();
		  });
		  // Hamburger to X toggle
		  $('#nav-toggle').on('click', function() {
			this.classList.toggle('active');
		  });
		}); // end DOM ready
	  })(jQuery); // end jQuery



	$('.modal').css("display" , "none");

	$("#management").click(function(){
		$("#manager-modal").css("display","block");
	});

	$("#insurance").click(function(){
		$("#insurance-modal").css("display","block");
	});
   
	$(".cancel").click(function(){
			$(".modal").fadeOut();
	});

	$('.career-toggle').css("display" , "none");

	$('.toggle-arrow a').click(function() {
		$('.career-toggle').slideToggle();
	});

	
	if (window.matchMedia('(max-width: 767px)').matches) {
		$('.veteran-block ul').css("display" , "none");
		$('body').on('click', '.toggle-arrow a', function(e) {
			$('.veteran-block').find('ul').stop().slideUp();
			$(this).closest('.veteran-block').find('.ul').stop().slideToggle();
			var $box = $(this).closest('.veteran-block');
			$box.siblings().find('ul').stop().slideUp();
			$box.find('ul').stop().slideToggle();
		});
	}


	$(".toggle-arrow a").click(function(e) {
		if ($(this).parents(".veteran-main-title").hasClass('rotate') == true){
			$(this).parents(".veteran-main-title").toggleClass('rotate');
		} else {
			$('.veteran-main-title').removeClass('rotate');
			$(this).parents(".veteran-main-title").toggleClass('rotate');
		}		
	});

	
	
}); 
