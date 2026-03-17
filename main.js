(function ($) {
    'use strict';

    // if ($.fn.owlCarousel) {
    //     // :: 1.0 Welcome Post Slider Active Code
    //     $(".post-sliders").owlCarousel({
    //         items: 4,
    //         loop: true,
    //         autoplay: true,
    //         smartSpeed: 1500,
    //         margin: 10,
    //         nav: true,
    //         navText: ['', ''],
    //         responsive: {
    //             320: {
    //                 items: 1
    //             },
    //             576: {
    //                 items: 2
    //             },
    //             992: {
    //                 items: 3
    //             },
    //             1200: {
    //                 items: 4
    //             }
    //         }
    //     })
    // }

    $(function () {
    if ($.fn.owlCarousel) {
      const $c = $(".post-slider");
      if ($c.hasClass("owl-loaded")) {
        $c.trigger("destroy.owl.carousel");
        $c.removeClass("owl-loaded owl-hidden");
        $c.find(".owl-stage-outer").children().unwrap();
      }

      $c.owlCarousel({
        items: 4,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3500,        
        autoplayHoverPause: true,
        smartSpeed: 1500,
        margin: 10,
        nav: true,
        dots: false,
        navText: ['', ''],
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          992: { items: 3 },
          1200: { items: 4 }
        }
      });

      $c.trigger('play.owl.autoplay', [3500]);
    } else {
      console.warn("OwlCarousel plugin not loaded. Check script order.");
    }
  });

    // :: 4.0 ScrollUp Active JS
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="fa fa-arrow-up" aria-hidden="true"></i>'
        });
    }

    // :: 5.0 CounterUp Active JS
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // :: 6.0 PreventDefault a Click
  $("a[href='#']").on('click', function (e) {
    e.preventDefault();
  });

    // :: 7.0 Search Form Active Code
    $(".searchBtn").on('click', function () {
        $(".search-hidden-form").toggleClass("search-form-open");
    });

    // :: 8.0 Search Form Active Code
    $("#pattern-switcher").on('click', function () {
        $("body").toggleClass("bg-pattern");
    });
    $("#patter-close").on('click', function () {
        $(this).hide("slow");
        $("#pattern-switcher").addClass("pattern-remove");
    });

    // :: 9.0 wow Active Code
      if (typeof WOW !== "undefined") {
    new WOW().init();
  }

    // :: 10.0 matchHeight Active JS
    if ($.fn.matchHeight) {
        $('.item').matchHeight();
    }

    var $window = $(window);

    // :: 11.0 Preloader active code
    $window.on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    (function(){
    const menuIcon = document.getElementById('menu-icon');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.mobile-nav .close-menu');

    if(!menuIcon || !mobileNav || !closeBtn) return;

    function openNav(){
      mobileNav.classList.add('is-open');
      document.body.classList.add('no-scroll');
    }
    function closeNav(){
      mobileNav.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }

    menuIcon.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);

    // close when clicking outside panel
    mobileNav.addEventListener('click', (e) => {
      if(e.target === mobileNav) closeNav();
    });
  })();

  (function () {
  function initGallery(gallery) {
    const imgs = Array.from(gallery.querySelectorAll('.rest-gallery-img'));
    const prevBtn = gallery.querySelector('.rest-gallery-arrow.is-prev');
    const nextBtn = gallery.querySelector('.rest-gallery-arrow.is-next');
    const dotsWrap = gallery.querySelector('.rest-gallery-dots');

    if (!imgs.length) return;

    let index = parseInt(gallery.getAttribute('data-start') || '0', 10);
    index = Math.max(0, Math.min(index, imgs.length - 1));

    // build dots
    dotsWrap.innerHTML = '';
    const dots = imgs.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'rest-gallery-dot' + (i === index ? ' is-active' : '');
      b.setAttribute('aria-label', `Go to image ${i + 1}`);
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
      return b;
    });

    function render() {
      imgs.forEach((img, i) => img.classList.toggle('is-active', i === index));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    }

    function goTo(i) {
      index = (i + imgs.length) % imgs.length;
      render();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // swipe support (mobile)
    let startX = 0;
    gallery.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) < 40) return;
      if (diff < 0) next(); else prev();
    });

    render();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.rest-gallery').forEach(initGallery);
  });
})();

})(jQuery);