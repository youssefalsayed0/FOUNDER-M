let navigation = document.getElementById("navbar");
let arrow = document.getElementById("floating-arrow");
let nums = document.querySelectorAll(".counter .number");
let statsSection = document.querySelector(".counter");
let started = false;

window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    navigation.style.backgroundColor = "#042d53";

  } else {
    navigation.style.backgroundColor = "";
  }

  if (window.scrollY >= statsSection.offsetTop - 500) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
};

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2500 / goal);
}

/*start aos library*/
AOS.init({
  easing: 'ease-in-out-sine',
  once: true,
});
/*end aos library*/



/* owl slider */
logo_carouselInit();
function logo_carouselInit() {
  $('.logo_items').owlCarousel({
    loop: true,
    margin: 20,
    smartSpeed: 2000,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 3,
      },
      576: {
        items: 4,
      },
      768: {
        items: 4,
      },
      992: {
        items: 4,
      }
    }
  })
}
/* end owl slider**/

/* start floating action button*/
function toggleSocialButtons() {
  var socialButtons = document.getElementById('socialButtons');
  if (socialButtons.style.display === 'block') {
    socialButtons.style.display = 'none';
  } else {
    socialButtons.style.display = 'block';
    socialButtons.style.position = 'fixed';
  }
}
/* end floating action button*/


/*** start stack cards **/
// utility functions
if (!Util) function Util() { };

Util.osHasReducedMotion = function () {
  if (!window.matchMedia) return false;
  var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (matchMediaObj) return matchMediaObj.matches;
  return false;
};

// File#: _1_stacking-cards
// Usage: codyhouse.co/license
(function () {
  var StackCards = function (element) {
    this.element = element;
    this.items = this.element.getElementsByClassName('js-stack-cards__item');
    this.scrollingFn = false;
    this.scrolling = false;
    initStackCardsEffect(this);
    initStackCardsResize(this);
  };

  function initStackCardsEffect(element) { // use Intersection Observer to trigger animation
    setStackCards(element); // store cards CSS properties
    var observer = new IntersectionObserver(stackCardsCallback.bind(element), { threshold: [0, 1] });
    observer.observe(element.element);
  };

  function initStackCardsResize(element) { // detect resize to reset gallery
    element.element.addEventListener('resize-stack-cards', function () {
      setStackCards(element);
      animateStackCards.bind(element);
    });
  };

  function stackCardsCallback(entries) { // Intersection Observer callback
    if (entries[0].isIntersecting) {
      if (this.scrollingFn) return; // listener for scroll event already added
      stackCardsInitEvent(this);
    } else {
      if (!this.scrollingFn) return; // listener for scroll event already removed
      window.removeEventListener('scroll', this.scrollingFn);
      this.scrollingFn = false;
    }
  };

  function stackCardsInitEvent(element) {
    element.scrollingFn = stackCardsScrolling.bind(element);
    window.addEventListener('scroll', element.scrollingFn);
  };

  function stackCardsScrolling() {
    if (this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(animateStackCards.bind(this));
  };

  function setStackCards(element) {
    // store wrapper properties
    element.marginY = getComputedStyle(element.element).getPropertyValue('--stack-cards-gap');
    getIntegerFromProperty(element); // convert element.marginY to integer (px value)
    element.elementHeight = element.element.offsetHeight;

    // store card properties
    var cardStyle = getComputedStyle(element.items[0]);
    element.cardTop = Math.floor(parseFloat(cardStyle.getPropertyValue('top')));
    element.cardHeight = Math.floor(parseFloat(cardStyle.getPropertyValue('height')));

    // store window property
    element.windowHeight = window.innerHeight;

    // reset margin + translate values
    if (isNaN(element.marginY)) {
      element.element.style.paddingBottom = '0px';
    } else {
      element.element.style.paddingBottom = (element.marginY * (element.items.length - 1)) + 'px';
    }

    for (var i = 0; i < element.items.length; i++) {
      if (isNaN(element.marginY)) {
        element.items[i].style.transform = 'none;';
      } else {
        element.items[i].style.transform = 'translateY(' + element.marginY * i + 'px)';
      }
    }
  };

  function getIntegerFromProperty(element) {
    var node = document.createElement('div');
    node.setAttribute('style', 'opacity:0; visbility: hidden;position: absolute; height:' + element.marginY);
    element.element.appendChild(node);
    element.marginY = parseInt(getComputedStyle(node).getPropertyValue('height'));
    element.element.removeChild(node);
  };

  function animateStackCards() {
    if (isNaN(this.marginY)) { // --stack-cards-gap not defined - do not trigger the effect
      this.scrolling = false;
      return;
    }

    var top = this.element.getBoundingClientRect().top;

    if (this.cardTop - top + this.element.windowHeight - this.elementHeight - this.cardHeight + this.marginY + this.marginY * this.items.length > 0) {
      this.scrolling = false;
      return;
    }

    for (var i = 0; i < this.items.length; i++) { // use only scale
      var scrolling = this.cardTop - top - i * (this.cardHeight + this.marginY);
      if (scrolling > 0) {
        var scaling = i == this.items.length - 1 ? 1 : (this.cardHeight - scrolling * 0.05) / this.cardHeight;
        this.items[i].style.transform = 'translateY(' + this.marginY * i + 'px) scale(' + scaling + ')';
      } else {
        this.items[i].style.transform = 'translateY(' + this.marginY * i + 'px)';
      }
    }

    this.scrolling = false;
  };

  // initialize StackCards object
  var stackCards = document.getElementsByClassName('js-stack-cards'),
    intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype),
    reducedMotion = Util.osHasReducedMotion();

  if (stackCards.length > 0 && intersectionObserverSupported && !reducedMotion) {
    var stackCardsArray = [];
    for (var i = 0; i < stackCards.length; i++) {
      (function (i) {
        stackCardsArray.push(new StackCards(stackCards[i]));
      })(i);
    }

    var resizingId = false,
      customEvent = new CustomEvent('resize-stack-cards');

    window.addEventListener('resize', function () {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 500);
    });

    function doneResizing() {
      for (var i = 0; i < stackCardsArray.length; i++) {
        (function (i) { stackCardsArray[i].element.dispatchEvent(customEvent) })(i);
      };
    };
  }
}());
/*** end stack cards **/