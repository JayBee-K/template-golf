(function ($) {
	'use strict';
	const windowWidth = $(window).width();
	const page = $('.page');
	const header = $('#header');

	const handleMenuMobile = function (currentWindow) {
		if (currentWindow >= 1200) return false;

		const btnToggle = $('#header .btn-show-nav, #header .btn-close-nav');
		const Body = $('body');
		const headerNavigation = $('#header .header-wrapper .header-navigation');

		headerNavigation.find('ul > li > ul').each(function (index) {
			$(this).prev().attr({
				"href": "#subMenu" + index,
				"data-toggle": "collapse",
				"aria-expanded": false,
				"aria-controls": "subMenu" + index,
			});
			$(this).attr({
				"id": "subMenu" + index,
				"class": "collapse list-unstyled mb-0",
			});

			if ($(this).find('ul').length > 0) {
				$(this).find('ul').each(function (index, element) {
					$(element).prev().attr({
						"href": "#subMenu_child" + index,
						"data-toggle": "collapse"
					});
					$(element).attr({
						"id": "subMenu_child" + index,
						"class": "collapse list-unstyled mb-0",
					});
				});
			}
		});

		headerNavigation.find('ul > li > a').on('click', function () {
			if ($(this).next('ul').hasClass('show')) {
				let _ul = $(this).next('ul');
				_ul.find('ul.show').removeClass('show');
				_ul.find('a[aria-expanded]').attr('aria-expanded', false);
			} else {
				$(this).closest('#hasMenu').find('.show').removeClass('show');
				$(this).closest('#hasMenu').find('a[aria-expanded]').attr('aria-expanded', false);
			}
		});

		btnToggle.on('click', function () {
			Body.toggleClass('nav-is-show');
		});

		$(document).on('click', function (event) {
			if (!$('#header .header-wrapper')[0].contains(event.target)) {
				Body.removeClass('nav-is-show');
			}
		});
	}

	const initSliderBanner = function () {
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

	const initSliderGolf = function () {
		if ($('#slider-golf').length) {
			new Swiper('#slider-golf > .swiper', {
				slidesPerView: 3,
				spaceBetween: 15,
				speed: 1000,
				loop: !1,
				pagination: {
					el: '#slider-golf  .swiper-pagination',
					clickable: 1,
				},
				navigation: {
					nextEl: '#slider-golf .button-next',
					prevEl: '#slider-golf .button-prev',
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
		}
	};

	const initSliderNews = function () {
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

	const initSliderPartner = function () {
		if ($('#slider-partner .swiper').length) {
			new Swiper('#slider-partner .swiper', {
				slidesPerView: 1.5,
				spaceBetween: 15,
				speeds: 750,
				autoplay: {
					delay: 4000,
				},
				pagination: {
					el: '#slider-partner > .swiper-actions > .swiper-pagination',
					clickable: 1,
				},
				breakpoints: {
					375: {
						slidesPerView: 2.5
					},
					992: {
						slidesPerView: 3.5
					},
					1200: {
						slidesPerView: 5
					}
				}
			});
		}
	}

	const addPaddingPage = function () {
		if (!page.length || !header.length) return false;
		page.css({'padding-top': `${header.outerHeight(true)}px`});
	};

	const handleWindowResize = function () {
		$(window).resize(function () {
			addPaddingPage();
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
		const productPreview = $('#product-preview');
		const productThumbs = $('#product-thumbs');

		if (!productPreview.length && productThumbs.length > 0) {
			avatarPhoto = new Swiper('#product-thumbs > .swiper', {
				slidesPerView: 1,
				navigation: {
					nextEl: '#button-next',
					prevEl: '#button-prev',
				},
			});
			return false;
		}

		if (!productPreview.length && !productThumbs.length) {
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
				575: {
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
			if (!headerCart[0].contains(event.target)) {
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
		if (!$(selectorId).length) return false;
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
	};

	const handleSelectGroup = function (idSelector, target) {
		const container = $(idSelector);
		const holeList = container.find(target);
		const input = container.find('input');

		holeList.on('click', function () {
			const _this = $(this);
			if (!_this.hasClass('active')) {
				holeList.removeClass('active');
				_this.addClass('active');
				input.val(_this.attr('data-value'));
			}
		});
	}


	$(function () {
		handleMenuMobile(windowWidth);
		initSliderBanner();
		initSliderGolf();
		initSliderNews();
		initSliderPartner();
		addPaddingPage();
		handleWindowResize();

		// PAGE PRODUCT DETAIL
		handleSlideProduct();
		handleToggleCartList();

		// PAGE BOOKING GOLF
		initSwiperBookingPreview();
		showModalSearchUser();

		handleDatePicker('#date-picker');

		handleSelectGroup('#form-group-holes', '.btn-hole');
		handleSelectGroup('#form-group-golfers', '.btn-golfer');


		const handleFullPage = () => {
			if (windowWidth >= 1280) {
				let heightFooter = $('#footer').outerHeight();
				$('#slider-banner .swiper-slide').css({
					'padding-top': `calc(100vh - ${heightFooter}px)`,
				})
			}
		}

		handleFullPage();
		$(window).resize(() => handleFullPage());
	});
})(jQuery);
