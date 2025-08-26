const openBtn = document.querySelectorAll(".openModal");
const closeBtn = document.querySelectorAll(".closeModal");
const video = document.querySelector('.video-background');

const swiperText = new Swiper('.swiper', {
    speed: 1600, mousewheel: {},
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
    }
});

swiperText.on('slideChange', function() {
    gsap.to(video, 1.6, {
        currentTime: (video.duration / (this.slides.length)) * this.realIndex,
        ease: Power2.easeOut
    })
});

swiperText.on('slideChangeTransitionStart', function() {
    video.classList.add('change')
}).on('slideChangeTransitionEnd', function() {
    video.classList.remove('change')
});

openBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        modal.classList.add("open");
        swiperText.mousewheel.disable();
    });
});
closeBtn.forEach(btn => {
    btn.addEventListener("click", ()=>{
        btn.closest(".modal").classList.remove("open");
        swiperText.mousewheel.enable();
    });
});