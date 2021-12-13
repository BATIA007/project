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