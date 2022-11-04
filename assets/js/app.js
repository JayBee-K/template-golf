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

	const handleZoomImageProduct = function (elm, avatarPhoto, avatarThumb) {
		if (!elm || !avatarPhoto || !avatarThumb) return false;
		let i = 0;
		elm.click(function () {
			i = 0;
		});

		elm.fancybox({
			touch: true,
			beforeShow: function (instance, current) {
				let index = $(`[data-fancybox='preview-box'][href='${current.src}']`).attr('data-index');
				avatarPhoto.slideTo(index - 1);
				if ($('#product-preview').length > 0) {
					avatarThumb.slideTo(index - 1);
				}
			},
		});
	};

	const handleSlideProduct = function () {
		let [avatarThumb, avatarPhoto] = [];

		if (!$('#product-preview').length && $('#product-thumbs').length > 0) {
			avatarPhoto = new Swiper('#product-thumbs > .swiper', {
				slidesPerView: 1,
				navigation: {
					nextEl: '#button-next',
					prevEl: '#button-prev',
				},
			});
			return false;
		}

		if (!$('#product-preview').length && !$('#product-thumbs').length) {
			return false;
		}

		avatarThumb = new Swiper('#product-thumbs > .swiper', {
			loopAdditionalSlides: 0,
			spaceBetween: 10,
			slidesPerView: 3,
			breakpoints: {
				320: {
					slidesPerView: 2.5,
				},
				525: {
					slidesPerView: 3.5,
				},
				991: {
					slidesPerView: 4,
				},
			},
		});
		avatarPhoto = new Swiper('#product-preview > .swiper', {
			thumbs: {
				swiper: avatarThumb,
			},
			slidesPerView: 1,
			navigation: {
				nextEl: '#product-preview .swiper-button.next',
				prevEl: '#product-preview .swiper-button.prev',
			},
		});

		handleZoomImageProduct($('#product-preview [data-fancybox="preview-box"]'), avatarPhoto, avatarThumb);
	};

	const handleToggleCartList = function () {
		const btnToggle = $('#toggle-cart-list');
		const headerCart = $('.header .header-cart');

		btnToggle.on('click', function () {
			headerCart.toggleClass('show');
		});

		$(document).on('click', function (event) {
			if(!headerCart[0].contains(event.target)) {
				headerCart.removeClass('show');
			}
		});
	};

	const initSwiperBookingPreview = function () {
		if ($('#booking-preview').length) {
			new Swiper('#booking-preview .swiper', {
				speed: 1000,
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				},
				loop: 1,
				navigation: {
					nextEl: '#booking-preview .swiper-button.next',
					prevEl: '#booking-preview .swiper-button.prev',
				},
			});
		}
	};

	const showModalSearchUser = function () {
		$('.checkout-guests .guest:not(:first)').on('click', function () {
			$('#modal-add-user').modal('show');
		});
	};

	const handleDatePicker = function (selectorId) {
		if(!$(selectorId).length) return false;
		$(selectorId).flatpickr({
			dateFormat: 'd-m-Y',
			defaultDate: 'today',
			enable: [
				{
					from: 'today',
					to: new Date().fp_incr(60)
				}
			]
		});
	}

	$(function () {
		initSliderBanner();
		initSliderTestimonials();
		initSliderNews();
		addPaddingSinglePage();
		handleWindowResize();

		// PAGE PRODUCT DETAIL
		handleSlideProduct();
		handleToggleCartList();

		// PAGE BOOKING GOLF
		initSwiperBookingPreview();
		showModalSearchUser();

		handleDatePicker('#date-picker');

	});
})(jQuery);
