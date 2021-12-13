const slider1 = new Swiper('.slider-swiper', {
    loop: true,

    navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev'
    },

    pagination: {
        el: '.slider__pagination',
        type: 'bullets',
        clickable: true,
    },

    autoplay: {
        delay: 6000
    }
})

const slider2 = new Swiper('.comments__slider', {
    loop: true,

    navigation: {
        nextEl: '.comments__prev',
        prevEl: '.comments__next'
    },

    pagination: {
        el: '.comments__pagination',
        type: 'bullets',
        clickable: true,
    },

    autoplay: {
        delay: 6000
    },

    grabCursor: true,
})

function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

const time = document.querySelector('.comments__now-time');
const timeString = document.querySelector('.comments__now-date');

function reloadTime() {
    time.textContent = formatAMPM(new Date()).replace(/[^0-9:]/g,"");
    timeString.textContent = formatAMPM(new Date()).toUpperCase();
}

reloadTime();

setInterval(reloadTime, 60000);