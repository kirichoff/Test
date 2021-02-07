ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map('map', {
    center: [54.089168, 27.446409],
    zoom: 10,
    controls: []
  }, {
    searchControlProvider: 'yandex#search'
  });

  const office = new ymaps.Placemark(myMap.getCenter(), {
    balloonContentHeader: '<div class="text-primary text-25">Фрезтех</div>',
    balloonContentBody: 'Офис',
    balloonContentFooter: 'OOO "Фрезтех"',
    hintContent: 'Мы тут!',
  }, {
    preset: 'islands#icon',
    iconColor: '#FDB900'
  });
  const storage = new ymaps.Placemark([53.91675298073794, 27.521710253098334], {
    balloonContentHeader: '<div class="text-primary text-25">Склад</div>',
    balloonContentBody: 'Склад (пунтк приема)',
    balloonContentFooter: 'OOO "Фрезтех"',
    hintContent: 'Склад',
  }, {
    preset: 'islands#icon',
    iconColor: '#FDB900'
  });

  let marks = document.getElementsByClassName('mark-action');

  //add scroll button action
  [office, storage].forEach(
    (item, index) =>
      marks[index].onclick = () => {
        item.balloon.autoPan();
        item.balloon.open();
      }
  );

  myMap.geoObjects.add(office);
  myMap.geoObjects.add(storage);
  office.balloon.open();
}

$(window).ready(function () {

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    var bar = document.getElementById("navbar");

    if(currentScrollPos > 50){
      bar.classList.remove("main")
    }
    else {
      bar.classList.add("main")
    }

    if (prevScrollpos > currentScrollPos) {
      bar.style.top = "0";
    } else {
      bar.style.top = "-70px";
    }
    prevScrollpos = currentScrollPos;
  }


  let arr = ['#repair-table-frez', '#repair-table-pil'];
  arr.forEach(selector =>
    document.querySelectorAll(selector + ' tr')
      .forEach((n, index) => index > 3 ? n.style.display = "none" : null)
  );

  let tables =[
    {id: 'rep-frez',table:'repair-table-frez', open: false},
    {id: "rep-pil",table:'repair-table-pil', open: false},
  ];

  let hide = (id) => {
    document.querySelectorAll("#" +id + ' tr')
      .forEach((n, index) => index > 3? n.style.display = "none" : null);
  };

  let show = (id) => {
    document.querySelectorAll("#" + id + ' tr')
      .forEach((n, index) => n.style.display = "table-row" );
  };

  tables.forEach(
    (node,index)=>
    {
      let el = document.getElementById(node.id)
        el.onclick = () => {
          if(node.open){
            hide(node.table)
            el.innerText = "Ёще"
          }
          else {
            show(node.table)
            el.innerText = "Скрыть"
          }
          node.open = !node.open
        }

    }

  )


  let hideS = document.getElementById('hide-schema');
  let showS = document.getElementById('show-schema');
  let s =document.getElementById("schema");

  showS.onclick = () => {

    hideS.classList.remove("active-btn")
    showS.classList.add("active-btn")

    s.style.display = "block"
  }

  hideS.onclick = () => {

    showS.classList.remove("active-btn")
    hideS.classList.add("active-btn")

    s.style.display = "none"

  }

  //scrolling
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
            ;
          });
        }
      }
    });
})
