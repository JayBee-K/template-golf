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

	const handleStickyHeader = () => {
		const header = $('#header');
		const position = $('#slider-banner').length ? $('#slider-banner').height() : header.offset().top;
		$(window).scroll(function () {
			const scrollValue = $(window).scrollTop();
			if (scrollValue > position) {
				header.addClass('is-sticky');
			} else {
				header.removeClass('is-sticky');
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

	const handleExpandedDescription = function () {
		if ($('#description-expand').length) {
			let elmDescription = $('#description-expand');
			let scrollHeight = elmDescription.find('.content')[0].scrollHeight;
			elmDescription.css('--height', scrollHeight + 'px');

			if (scrollHeight <= elmDescription.innerHeight() + 4) {
				$('#expand-button').remove();
			} else {
				$('#expand-button').click(function () {
					if (elmDescription.hasClass('is-show')) {
						elmDescription.removeClass('is-show');
						$(this).find('span').html('Xem thêm <i class="fal fa-angle-down"></i>');
					} else {
						elmDescription.addClass('is-show');
						$(this).find('span').html('Thu gọn <i class="fal fa-angle-up"></i>');
					}
				});
			}
		}
	}

	const handleDropdownQuantity = function () {
		if ($('.form-group_quantity').length) {
			$('.form-group_quantity').each(function () {
				$(this).find('.form-group_quantity_inner').click(function () {
					if (!$(this).parent().hasClass('is-show')) {
						$(this).parent().addClass('is-show');
					}
				});
				$(this).find('.quantity-close').click(function () {
					if ($(this).parents('.form-group_quantity').hasClass('is-show')) {
						$(this).parents('.form-group_quantity').removeClass('is-show');
					}
				});
			});

			$(document).mouseup(function (e) {
				let elm = $('.form-group_quantity.is-show');
				elm.is(e.target) || 0 !== elm.has(e.target).length || (
					elm.removeClass('is-show')
				)
			});
		}
	}

	const handleChangQuantity = function () {
		$('.quantity-button').click(function () {
			let type = $(this).attr('data-type'),
				count = $(this).parent().find('.quantity-count'),
				countValue = parseInt(count.html()),
				typeQuantity = $(this).closest('.quantity-dropdown_item').attr('data-type');

			if (type == 0) {
				if (countValue == 0) {
					return false;
				}

				countValue -= 1;
				count.html(countValue);
			} else {
				countValue += 1;
				count.html(countValue);
			}

			$(this).closest('.quantity-wrapper').find('.quantity-' + typeQuantity).html(countValue);
			$(this).closest('.quantity-wrapper').find('.quantity-input[data-type=' + typeQuantity + ']').val(countValue);
		});
	}

	let [popupThumb, popupPhoto] = [];
	let handleSlideImagePopup = function () {
		if ($('#popup-detail_images--thumb').length > 0) {
			popupThumb = new Swiper('#popup-detail_images--thumb .swiper', {
				loopAdditionalSlides: 0,
				spaceBetween: 10,
				slidesPerView: 6,
				breakpoints: {
					320: {
						slidesPerView: 3.5,
					},
					991: {
						slidesPerView: 4.5,
					},
				},
			});

			popupPhoto = new Swiper('#popup-detail_images--photo .swiper', {
				thumbs: {
					swiper: popupThumb,
				},
				slidesPerView: 1,
				navigation: {
					nextEl: '#popup-detail_images--photo .swiper-button.next',
					prevEl: '#popup-detail_images--photo .swiper-button.prev',
				},
			});

			popupPhoto.on('slideChangeTransitionStart', function () {
				popupThumb.slideTo(popupPhoto.activeIndex);
			});
		} else {
			popupPhoto = new Swiper('#popup-detail_images--photo .swiper', {
				slidesPerView: 1,
			});
		}
		if ($('#detail-avatar_photo [data-fancybox=product-avatar]').length) {
			handleZoomImagePopup($('#detail-avatar_photo [data-fancybox=product-avatar]'), popupPhoto, popupThumb);
		}
	}

	const handleZoomImagePopup = function (elm, popupPhoto, popupThumb) {
		let i = 0;
		elm.click(function () {
			i = 0;
		});

		elm.fancybox({
			touch: true,
			beforeShow: function (instance, current) {
				let index = $(`[data-fancybox='popup-detail_images'][href='${current.src}']`).attr('data-index');
				popupPhoto.slideTo(index - 1);
				if ($('#popup-detail_images--thumb').length > 0) {
					popupThumb.slideTo(index - 1);
				}
			},
		});
	}

	const initSliderImageTourMobile = function () {
		if ($('#detail-tours_images--mobile').length) {
			new Swiper('#detail-tours_images--mobile .swiper', {
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				},
				loop: 1,
				navigation: {
					nextEl: '#detail-tours_images--mobile .swiper-button.next',
					prevEl: '#detail-tours_images--mobile .swiper-button.prev',
				},
			});
		}
	};
	const initSliderImageHotelMobile = function () {
		if ($('#detail-hotel_images--mobile').length) {
			new Swiper('#detail-hotel_images--mobile .swiper', {
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				},
				loop: 1,
				navigation: {
					nextEl: '#detail-hotel_images--mobile .swiper-button.next',
					prevEl: '#detail-hotel_images--mobile .swiper-button.prev',
				},
			});
		}
	};

	let handleOrderCollapse = function () {
		if($('.order-column_collapse').length){
			$('.order-column_collapse').click(function () {
				$(this).toggleClass('flag');
				if($(this).is('.flag')) {
					$(this).html('Thu gọn');
				} else {
					$(this).html('Xem thêm');
				}
			});
		};
	}

	$(function () {
		handleMenuMobile(windowWidth);
		handleStickyHeader();
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

		handleDatePicker('#date-picker-tours');
		handleDatePicker('#date-picker-hotel');
		handleDatePicker('#date-picker-hotel_order');


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

		handleExpandedDescription();
		handleDropdownQuantity();
		handleChangQuantity();
		handleSlideImagePopup();
		initSliderImageTourMobile();
		initSliderImageHotelMobile();
		handleOrderCollapse();
	});
})(jQuery);
