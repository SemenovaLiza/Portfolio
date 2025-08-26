const openBtn = document.querySelectorAll(".openModal");
const closeBtn = document.querySelectorAll(".closeModal");
const video = document.querySelector('.video-background');
const projectVideos = document.querySelectorAll('.project-video');

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
function pauseAllProjectVideos() {
    projectVideos.forEach(v => v.pause());
}
function playActiveProjectVideo() {
    const activeSlide = swiperText.slides[swiperText.activeIndex];
    const video = activeSlide.querySelector('.project-video');
    if (video) {
        video.play();
    }
}
pauseAllProjectVideos();
playActiveProjectVideo();
swiperText.on('slideChange', function() {
    gsap.to(video, 1.6, {
        currentTime: (video.duration / (this.slides.length)) * this.realIndex,
        ease: Power2.easeOut
    });

    // Play only the active slide's video
    pauseAllProjectVideos();
    playActiveProjectVideo();
});
swiperText.on('slideChange', function() {
    gsap.to(video, 1.6, {
        currentTime: (video.duration / (this.slides.length)) * this.realIndex,
        ease: Power2.easeOut
    });

    // Pause all videos immediately
    pauseAllProjectVideos();

    // Play active slide video after 1 second
    setTimeout(() => {
        playActiveProjectVideo();
    }, 1000); // 1000ms = 1 second
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