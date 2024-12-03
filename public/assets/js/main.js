(function($) {

	"use strict";

	/*
	|--------------------------------------------------------------------------
	| Template Name: Veril
	| Author: ThemeMarch
	| Developer: Tamjid Bin Murtoza
	| Version: 1.0.0
	|--------------------------------------------------------------------------
	|--------------------------------------------------------------------------
	| TABLE OF CONTENTS:
	|--------------------------------------------------------------------------
	|
	| 1. Scripts initialization
	| 2. General Setup
	| 3. Primary Menu
	| 4. Scroll Function
	| 5. Accordian
	| 6. Scroll Up
	| 7. Modal Video
	| 8. Portfolio
	| 9. Owl Carousel
	| 10. Ajax Contact Form
	| 11. Slick Carousel
	| 12. Mailchimp js
	| 13. Google Map
	|
	*/

	/*--------------------------------------------------------------
		1. Scripts initialization
	--------------------------------------------------------------*/
	$.exists = function(selector) {
    return ($(selector).length > 0);
  }

	$(window).on('load', function() {
		$(window).trigger("scroll");
		$(window).trigger("resize");
		$("#tm-preloader").delay(100).fadeOut("slow");
		portfolioMsSetup();
	});

	$(document).ready(function() {
		$(window).trigger("resize");
		primaryMenuSetup();
		generalSetup();
		mobileMenu();
		accordianSetup();
		scrollUp();
		owlCarouselSetup();
		modalVideo();
		contactForm();
		sliderCarouselSetup();
		new WOW().init();
		portfolioMsSetup();
		if ($('.tm-parallax').length > 0) {
			$('.tm-parallax').parallax("50%", 0.3);
		}
		if ($('.player').length > 0) {
			$('.player').YTPlayer();
		}
		if ($('.tm-funfact-number').length > 0) {
			$('.tm-funfact-number').tamjidCounter();
		}
	});

	$(window).on('resize', function() {
		mobileMenu();
		portfolioMsSetup();
	});

	$(window).on('scroll', function() {
		scrollFunction();
	});

	/*--------------------------------------------------------------
		2. General Setup
	--------------------------------------------------------------*/

	function generalSetup() {

		// Social Button Active
		$(".tm-single-social-btn").on('mouseenter', function(){
			$(this).siblings().removeClass('tm-active');
	    $(this).addClass('tm-active');
	  });

	  // Search Btn
		$('.tm-hero-search-btn').on('click', function() {
			$(this).parents('.tm-site-header').addClass('tm-active-search');
		});
		$('.tm-cross').on('click', function() {
			$(this).parents('.tm-site-header').removeClass('tm-active-search');
		});

		// Data images
		//----------------------------------
		$('.tm-bg').each(function () {
			var src = $(this).attr('data-src');
			$(this).css({
				'background-image': 'url(' + src + ')'
			});
		});

		// Tab Section
		$('.tm-tabs .tab-links a').on('click',function(e){
		  var currentAttrValue=$(this).attr('href');
		  $('.tm-tabs '+ currentAttrValue).fadeIn(400).siblings().hide();
		  $(this).parent('li').addClass('active').siblings().removeClass('active');
		  e.preventDefault();
		});

	}


	/*--------------------------------------------------------------
		3. Primary Menu
	--------------------------------------------------------------*/
	
	function primaryMenuSetup() {

		$( ".tm-primary-nav-list" ).before( "<div class='m-menu-btn'><span></span></div>" );

		$(".m-menu-btn").on('click', function(){
			$( this ).toggleClass( "m-menu-btn-ext" );
			$(this).siblings('.tm-primary-nav-list').slideToggle("slow");
		});

		$( ".menu-item-has-children > ul" ).before( "<i class='fa fa-plus m-dropdown'></i>" );

		$('.m-dropdown').on('click', function() {
			$(this).siblings('ul').slideToggle("slow");
			$(this).toggleClass("fa-plus fa-minus")
		});

		$('.maptoggle').on('click', function() {
			$( this ).siblings('.google-map').toggleClass('map-toggle');
		});

	}

	function mobileMenu() {

		if ($(window).width() <= 991){  
			$('.tm-primary-nav').addClass('m-menu').removeClass('tm-primary-nav');
		} else {
			$('.m-menu').addClass('tm-primary-nav').removeClass('m-menu');
		}

	}

	/*--------------------------------------------------------------
		4. Scroll Function
	--------------------------------------------------------------*/

	function scrollFunction() {

		var scroll = $(window).scrollTop();

		if(scroll >= 10) {
			$(".tm-site-header").addClass("small-height");
		} else {
			$(".tm-site-header").removeClass("small-height");
		}

		// For Scroll Up
		if(scroll >= 350) {
			$("#scrollup").addClass("scrollup-show");
		} else {
			$("#scrollup").removeClass("scrollup-show");
		}

	}

	/*--------------------------------------------------------------
		5. Accordian
	--------------------------------------------------------------*/

	function accordianSetup() {

    var $this = $(this);
    $( ".accordian-head" ).append( "<span class='accordian-toggle'></span>" );
    $('.single-accordian').filter(':nth-child(n+2)').children('.accordian-body').hide();
    $('.single-accordian:first-child').children('.accordian-head').addClass('active');
    $('.accordian-head').on('click', function() {
      $(this).parent('.single-accordian').siblings().children('.accordian-body').slideUp();
      $(this).siblings().slideToggle();
      /* Accordian Active Class */
      $(this).toggleClass('active');
      $(this).parent('.single-accordian').siblings().children('.accordian-head').removeClass('active');
    });

  }


	/*--------------------------------------------------------------
		6. Scroll Up
	--------------------------------------------------------------*/

	function scrollUp() {

		$('#scrollup').on('click', function(e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 1000);
		});

	}

	/*--------------------------------------------------------------
		7. Modal Video
	--------------------------------------------------------------*/
  function modalVideo() {

    $(document).on('click', '.tm-video-open', function(e) {
      e.preventDefault();
      var video = $(this).attr('href');
      $('.tm-video-popup-container iframe').attr('src', video);
      $('.tm-video-popup').addClass('active');
    });
    $('.tm-video-popup-close, .tm-video-popup-layer').on('click', function(e) {
      $('.tm-video-popup').removeClass('active');
      $('html').removeClass('overflow-hidden');
      $('.tm-video-popup-container iframe').attr('src', 'about:blank')
      e.preventDefault();
    });

  }
  /*--------------------------------------------------------------
		8. Portfolio
	--------------------------------------------------------------*/

	function portfolioMsSetup() {

		if ($.exists('.tm-isotope')) {

	    $('.tm-isotope').isotope({
				itemSelector: '.tm-isotop-item',
				transitionDuration: '0.60s',
				percentPosition: true,
				masonry: {
					columnWidth: '.tm-grid-sizer'
				}
			});

			/* Active Class of Portfolio*/
			$('.tm-isotope-filter ul li').on('click', function(event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
					event.preventDefault();
			});

			/*=== Portfolio filtering ===*/
			$('.tm-isotope-filter ul').on('click', 'a', function() {
				var filterElement = $(this).attr('data-filter');
				$(this).parents(".tm-isotope-filter").next().isotope({
					filter: filterElement
				});
			});
    }

	}


	/*--------------------------------------------------------------
		9. Owl Carousel
	--------------------------------------------------------------*/

	function owlCarouselSetup() {
  
	  /* Owl Carousel For Team member style1 */
	  $('.tm-team.tm-style1').owlCarousel({
	    loop:true,
	    autoplay:false,
	    margin:30,
	    autoplayTimeout: 6000,
	    smartSpeed: 1000,
	    dots: true,
	    nav:true,
	    navText: ['<i class="icofont-bubble-left"></i><i class="icofont-bubble-left"></i>','<i class="icofont-bubble-right"></i><i class="icofont-bubble-right"></i>'],
	    responsive:{
	      0:{
	        items:1
	      },
	      767:{
	        items:2
	      },
	      1230:{
	        items:3
	      }
	    }
		});

    /* Owl Carousel For Testimonial style1 */
    $('.tm-testimonials.tm-style1').owlCarousel({
    	items: 1,
      animateOut: 'fadeOut',
      loop: true,
      autoplay: true,
      autoplayTimeout: 6000,
      smartSpeed: 1000,
      dots:true,
      nav: true,
      navText: ['<i class="icofont-bubble-left"></i><i class="icofont-bubble-left"></i>','<i class="icofont-bubble-right"></i><i class="icofont-bubble-right"></i>']
    });

    // Owl Carousel For Client style1
    $('.tm-clients.tm-style1').owlCarousel({
    	loop:true,
    	nav:false,
    	autoplay:true,
    	margin:30,
    	autoplayTimeout: 6000,
      smartSpeed: 1000,
      dots:false,
    	responsive:{
        0:{
          items:1
        },
        575:{
          items:2
        },
        1000:{
          items:3
        },
        1199:{
          items:5
        }
    	}
    });

    /* Owl Carousel For hero-slider */
		$('.tm-hero-slider.tm-style1').owlCarousel({
		  items: 1,
	    loop: true,
	    nav: true,
	    autoplayTimeout: 6000,
      smartSpeed: 1000,
	    navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
	    autoplay: false ,
	    dots: true     
    });

    $('.tm-blog-slider').owlCarousel({
		  items: 1,
	    loop: true,
	    nav: true,
	    autoplayTimeout: 6000,
      smartSpeed: 1000,
	    navText: ['<i class="icofont-bubble-left"></i>','<i class="icofont-bubble-right"></i>'],
	    autoplay: false ,
	    dots: false     
    });
	}

	/*--------------------------------------------------------------
		10. Ajax Contact Form
	--------------------------------------------------------------*/

	function contactForm() {

		$('#tm-alert').hide();
	  $('#contact-form #submit').on('click', function() {
	    var name = $('#name').val();
	    var email = $('#email').val();
	    var subject = $('#subject').val();
	    var phone = $('#phone').val();
	    var msg = $('#msg').val();
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			
		if (!regex.test(email)) {
			$('#tm-alert').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please Enter Valid Email.</div>');
			return false;
		}

    name = $.trim(name);
    email = $.trim(email);
    subject = $.trim(subject);
    phone = $.trim(phone);
    msg = $.trim(msg);

    if (name != '' && email != '' && subject != '' && msg != '') {
      var values = 	"name=" + name + 
        "&email=" + email + 
        "&subject=" + subject + 
        "&phone=" + phone + 
        "&msg=" + msg;
      $.ajax({
        type: "POST",
        url: "assets/php/mail.php",
        data: values,
        success: function() {
          $('#name').val('');
          $('#email').val('');
          $('#subject').val('');
          $('#phone').val('');
          $('#msg').val('');
          $('#tm-alert').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
          setTimeout(function() {
            $('#tm-alert').fadeOut('slow');
          }, 4000);
        }
      });
    } else {
				$('#tm-alert').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> All fields are required.</div>');
	    	}
	      return false;
	  });

	}
	/*--------------------------------------------------------------
		11. Slick Carousel
	--------------------------------------------------------------*/

	function sliderCarouselSetup() {
	if ($('.slider-nav').length > 0) {
		// Default Slick Slider
		$('.slider-for').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  asNavFor: '.slider-nav'
		});

		$('.slider-nav').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.slider-for',
		  dots: false,
		  focusOnSelect: true,
		  responsive: [{
		    breakpoint: 1199,
		    settings: {
		      slidesToShow: 3,
		      infinite: true
		    }

		  }, {
		    breakpoint: 991,
		    settings: {
		      slidesToShow: 3,
		      dots: true
		    }

		    }, {
		      breakpoint: 767,
		      settings: {
		        slidesToShow: 1,
		        dots: true
		      }
		    }, {
		      breakpoint: 300,
		      settings: "unslick" // destroys slick
		    }]
		 });
		}
	}
	/*--------------------------------------------------------------
	    12. Mailchimp js
	--------------------------------------------------------------*/
	// mailchimp start
    if ($('.mailchimp').length > 0) {
      $('.mailchimp').ajaxChimp({
        language: 'es',
        callback: mailchimpCallback
      });
    }

    function mailchimpCallback(resp) {
      if (resp.result === 'success') {
        $('.subscription-success').html('<i class="fa fa-check"></i><br/>' + resp.msg).fadeIn(1000);
        $('.subscription-error').fadeOut(500);

      } else if (resp.result === 'error') {
        $('.subscription-error').html('<i class="fa fa-times"></i><br/>' + resp.msg).fadeIn(1000);
      }
    }
    $.ajaxChimp.translations.es = {
      'submit': 'Submitting...',
      0: 'We have sent you a confirmation email',
      1: 'Please enter a value',
      2: 'An email address must contain a single @',
      3: 'The domain portion of the email address is invalid (the portion after the @: )',
      4: 'The username portion of the email address is invalid (the portion before the @: )',
      5: 'This email address looks fake or invalid. Please enter a real email address'
    };

	/*--------------------------------------------------------------
	    13. Google Map
	--------------------------------------------------------------*/

   if ($('#tm-map').length > 0) {

    var contactmap = {
      lat: 39.742043,
      lng: -104.991531
    };

    $('#tm-map')
      .gmap3({
        zoom: 12,
        center: contactmap,
        scrollwheel: false,
        mapTypeId: "shadeOfGrey",
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, "shadeOfGrey"]
        }
    	})

      .styledmaptype(
        "shadeOfGrey", [

          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#fefefe"
              }, {
                "lightness": 17
              }, {
                "weight": 1.2
              }]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#fefefe"
            }, {
              "lightness": 20
            }]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
            	"color": "#f2f2f2"
            }, {
                "lightness": 19
              }]
          },
          {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
              "saturation": 36
            }, {
                "color": "#333333"
              }, {
                "lightness": 40
            }]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
              "visibility": "on"
            }, {
                "color": "#ffffff"
              }, {
                "lightness": 16
            }]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
              "color": "#f5f5f5"
            }, {
              "lightness": 21
           }]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
              "color": "#ffffff"
            }, {
                "lightness": 16
              }]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
              "color": "#ffffff"
            }, {
              "lightness": 18
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
              "color": "#ffffff"
            }, {
                "lightness": 29
              }, {
                "weight": 0.2
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
              "color": "#ffffff"
            }, {
              "lightness": 17
            }]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
          }, {
            "lightness": 20
          }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
          "color": "#e9e9e9"
          }, {
            "lightness": 17
          }]
        }
      ], {
        name: "HQ"
    })
    .marker({
      position: contactmap,
      icon: 'assets/img/map-marker.png'
  	})
	}
 

})(jQuery); // End of use strict
