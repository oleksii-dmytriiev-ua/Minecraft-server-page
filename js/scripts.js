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
    let scrollPos = $(window).scrollTop() + 250;
    let activeSet = false;
    let nearestSection = null;
    let nearestDistance = Infinity;

    $('.navbar-menu a').each(function () {
      const currLink = $(this);
      const refElement = $(currLink.attr("href"));

      if (refElement.length) {
        const sectionTop = refElement.position().top;
        const distance = Math.abs(sectionTop - scrollPos);

        if (sectionTop <= scrollPos && distance <= 500) {
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestSection = currLink;
          }
          activeSet = true;
        }
      }
    });

    if (nearestSection) {
      $('.navbar-menu a').removeClass("active");
      nearestSection.addClass("active");
    }

     // Вибір "Головна", якщо скрол у верхній частині сторінки або на 400px нижче
     if ($(window).scrollTop() <= 700) {
      $('.navbar-menu a').removeClass("active");
      $('.navbar-menu a[href="#top"]').addClass("active");
      activeSet = true;
    }

    // Якщо ми в самому низу сторінки, виділяємо останній пункт
    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
      $('.navbar-menu a').removeClass("active");
      $('.navbar-menu a[href="#scroll-to-bottom"]').addClass("active");
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
      const offset = 85;
      const targetPosition = targetElement.offset().top - offset;
  
      $('html, body').animate({
        scrollTop: targetPosition
      }, 600);
    }

    $('.navbar-menu a').removeClass('active');
    $(this).addClass('active');
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