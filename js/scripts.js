(function ($) {
  "use strict";

  let scrollToTarget = null;
  let isScrollingLocked = false;

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
      date.setTime(date.getTime() + 31536000000); // 1 year
      document.cookie = "cookie-consent=true; expires=" + date.toUTCString() + "; path=/;";
      $("#cookie-popup").fadeOut(300);
    });
  }

  // Handle click on navbar links
  $(document).on('click', '.navbar-menu a', function(e) {
    e.preventDefault();

    const targetId = $(this).attr('href');
    const targetElement = $(targetId);

    if (targetElement.length) {
      const offset = 85;
      const targetPosition = targetElement.offset().top - offset;

      $('html, body').animate({
        scrollTop: targetPosition
      }, 600);

      // Immediately update active class
      $('.navbar-menu a').removeClass('active');
      $(this).addClass('active');

      // Set the target section to wait for
      scrollToTarget = targetElement;
      isScrollingLocked = true;
    }
  });

  // Handle scroll
  $(window).on("scroll", function() {
    if (isScrollingLocked) {
      // Check if the target section is in view
      const scrollPos = $(window).scrollTop();
      const targetOffset = scrollToTarget.offset().top;
      const targetHeight = scrollToTarget.outerHeight();
      
      if ( 
    (scrollPos + $(window).height() >= $(document).height()) ||  
    scrollPos <= 1 ||  
    scrollPos == 968 ||  
    scrollPos == 1508 ||  
    scrollPos == 2189) {
    // The target section is in view, or the bottom of the page is reached
    isScrollingLocked = false;
    scrollToTarget = null; // Clear the target
}

      return;
    }

    let scrollPos = $(window).scrollTop() + 250;

    let activeSet = false;
    let nearestSection = null;
    let nearestDistance = Infinity;

    $('.navbar-menu a').each(function () {
      const currLink = $(this);
      const refElement = $(currLink.attr("href"));

      if (refElement.length) {
        const sectionTop = refElement.offset().top;
        const sectionBottom = sectionTop + refElement.outerHeight();
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

    // Highlight "Головна" if near the top of the page
    if ($(window).scrollTop() <= 700) {
      $('.navbar-menu a').removeClass("active");
      $('.navbar-menu a[href="#top"]').addClass("active");
    }

    // Highlight the last item if at the bottom of the page
    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
      $('.navbar-menu a').removeClass("active");
      $('.navbar-menu a[href="#scroll-to-bottom"]').addClass("active");
    }
  });

  // Clone navbar for mobile view
  $(".js-clone-nav").each(function () {
    var $this = $(this);
    $this.clone().attr("class", "mobile-navbar-wrap").appendTo(".mobile-navbar-body");
  });


  let notificationTimeout; 

$("body").on("click", "#copyip", function () {
  navigator.clipboard.writeText("schbedwars.minecra.fr").then(() => {
    const notification = document.getElementById('notification');
    const timerBar = document.getElementById('timer-bar');

   
    clearTimeout(notificationTimeout);
    timerBar.style.animation = 'none';
   
    setTimeout(() => {
      timerBar.style.animation = 'decrease-width 3s linear forwards'; 
    }, 10);

    notification.style.display = 'block';

    notificationTimeout = setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);  
  }).catch((error) => {
    console.error(error);
  });
});

  
  // Games Carousel
  new Swiper(".games-swiper", {
    loop: true,
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

  // Cosmetics Carousel
  new Swiper(".sponsor-swiper", {
    loop: true,
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