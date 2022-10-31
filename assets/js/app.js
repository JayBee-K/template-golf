(function ($) {
	'use strict';
	let windowWidth = $(window).width();

	let initSliderBanner = function () {
		if ($('#slider-banner').length) {
			new Swiper('#slider-banner .swiper', {
				speed: 1000,
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				},
				loop: 1,
				effect: 'fade',
			});
		}
	};

	let initSliderTestimonials = function () {
		if ($('#slider-testimonials').length) {
			new Swiper('#slider-testimonials .swiper', {
				spaceBetween: 15,
				speed: 1000,
				loop: !1,
				breakpoints: {
					320: {
						slidesPerView: 1,
					},
					375: {
						slidesPerView: 1.5,
					},
					768: {
						slidesPerView: 2.5,
					},
					1499: {
						slidesPerView: 3,
					},
				},
				pagination: {
					el: '#slider-testimonials .swiper-pagination',
					clickable: 1,
				},
			});
		}
	};

	let initSliderNews = function () {
		if (!$('#slider-news').length) return false;
		new Swiper('#slider-news > .swiper', {
			slidesPerView: 4,
			spaceBetween: 15,
			speed: 1000,
			loop: !1,
			pagination: {
				el: '#slider-news > .swiper-actions > .swiper-pagination',
				clickable: 1,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				375: {
					slidesPerView: 1.25,
				},
				768: {
					slidesPerView: 2.5,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		});
	};

	const addPaddingSinglePage = function () {
		const container = $('.page');
		const header = $('#header');
		if (!container.length || !header.length) return false;
		container.css({ 'padding-top': `${header.outerHeight(true)}px` });
	};

	const handleWindowResize = function () {
		$(window).resize(function () {
			addPaddingSinglePage();
		});
	};

	$(function () {
		initSliderBanner();
		initSliderTestimonials();
		initSliderNews();
		addPaddingSinglePage();
		handleWindowResize();
	});
})(jQuery);
