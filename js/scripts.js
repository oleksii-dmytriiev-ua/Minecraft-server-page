(function ($) {
  "use strict";

  // Preloader
  $("#page").css("display", "none");
  $(window).on("load", function () {
    $("#loader").addClass("loaded");
    $("#page").css("display", "");
  });

  // Cookies
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  if (getCookie("cookie-consent") != "") {
    $("#cookie-popup").attr("style", "display: none;");
  } else {
    $("#cookie-popup").removeAttr("style");
    $("#btn-cookie").click(function () {
      let date = new Date();
      date.setTime(date.getTime() + 31536000000);
      document.cookie = "cookie-consent=true; expires=" + date.toUTCString() + "path=/;";
      $("#cookie-popup").fadeOut(300);
    });
  }

  // Navbar
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 100) {
      $(".desktop-navbar").addClass("navbar-scroll");
    } else {
      $(".desktop-navbar").removeClass("navbar-scroll");
    }
  });

  $(".js-clone-nav").each(function () {
    var $this = $(this);

    $this.clone().attr("class", "mobile-navbar-wrap").appendTo(".mobile-navbar-body");
  });

  $("body").on("click", ".js-menu-toggle", function (e) {
    var $this = $(this);
    e.preventDefault();

    if ($("body").hasClass("offcanvas-menu")) {
      $("body").removeClass("offcanvas-menu");
      $this.removeClass("active");
    } else {
      $("body").addClass("offcanvas-menu");
      $this.addClass("active");
    }

    if ($("body").hasClass("offcanvas-menu")) {
      $(".mobile-mask").addClass("active");
    } else {
      $(".mobile-mask").removeClass("active");
    }
  });

  $(document).mouseup(function (e) {
    var container = $(".mobile-navbar");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
        $(".mobile-mask").removeClass("active");
      }
    }
  });

  // Copy IP Button
  $("body").on("click", "#copyip", function () {
    navigator.clipboard.writeText("schbedwars.minecra.fr").then((error) => {
      if (error) {
        console.error(error);
      } else {
        Swal.fire({
          icon: "success",
          title: "Server IP Copied",
          html: "Server IP successfully copied to the clipboard.",
        });
      }
    });
  });

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    const targetId = $(this).attr('href');
    const targetElement = $(targetId);

    if (targetElement.length) {
      const offset = -85; // Висота лінії навігації
      const targetPosition = targetElement.offset().top + offset;
      
      // Прокручує до цільового елемента миттєво
      window.scrollTo({
        top: targetPosition,
        behavior: 'auto' // Без анімації
      });
    }
  });

  // Games Carousel
  new Swiper(".games-swiper", {
    loop: true,
    autoplay: true,
    autoplay: {
      delay: 2500,
    },
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: -50,
    slideActiveClass: "active",
    navigation: {
      nextEl: ".games-swiper-button-next",
      prevEl: ".games-swiper-button-prev",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
    },
  });

  // Cosmetics
  new Swiper(".sponsor-swiper", {
    loop: true,
    autoplay: true,
    autoplay: {
      delay: 2500,
    },
    slidesPerView: 1,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
})(window.jQuery);
