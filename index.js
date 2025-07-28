// 메뉴 컨테이너와 메가메뉴를 선택
  const menuContainer = document.querySelector('.menu-container');
  const megaMenu = document.querySelector('.mega-menu');
  let menuTimer;

  menuContainer.addEventListener('mouseenter', () => {
    clearTimeout(menuTimer);
    megaMenu.style.display = 'block';
  });

  menuContainer.addEventListener('mouseleave', () => {
    menuTimer = setTimeout(() => {
      megaMenu.style.display = 'none';
    }, 180); // 180ms 후 닫힘 (자연스럽게)
  });

  megaMenu.addEventListener('mouseenter', () => {
    clearTimeout(menuTimer);
    megaMenu.style.display = 'block';
  });

  megaMenu.addEventListener('mouseleave', () => {
    menuTimer = setTimeout(() => {
      megaMenu.style.display = 'none';
    }, 180);
  });

const slidesWrap = document.querySelector('.main-slider .slides-wrap');
const slideElems = document.querySelectorAll('.main-slider .slide');
const dots = document.querySelectorAll('.main-slider .dot');
const prevBtn = document.querySelector('.main-slider .slide-prev');
const nextBtn = document.querySelector('.main-slider .slide-next');

const totalSlides = slideElems.length;

// 슬라이드 클론 생성 (앞/뒤)
const firstClone = slideElems[0].cloneNode(true);
const lastClone = slideElems[totalSlides-1].cloneNode(true);
slidesWrap.insertBefore(lastClone, slideElems[0]);
slidesWrap.appendChild(firstClone);

const slides = document.querySelectorAll('.main-slider .slide');
const slideCount = slides.length;
let current = 1; // 0은 lastClone이므로 실제 첫 슬라이드는 1
let timer = null;

// 슬라이드 크기
function getSlideWidth() {
  return slides[0].clientWidth;
}

// 슬라이드 이동
function goToSlide(idx, animated=true) {
  slidesWrap.style.transition = animated ? 'transform 0.7s cubic-bezier(.6,0,.35,1)' : 'none';
  slidesWrap.style.transform = `translateX(${-idx * 100}%)`;
  current = idx;
  // dot 활성화
  dots.forEach((dot, i) => dot.classList.toggle('active', i === ((idx-1+totalSlides)%totalSlides)));
}

// 무한 슬라이드 자동 이동 후 순간 이동 처리
function nextSlide() {
  if (current < slideCount-1) {
    goToSlide(current+1, true);
  }
}
function prevSlide() {
  if (current > 0) {
    goToSlide(current-1, true);
  }
}

// 트랜지션 끝나면 위치 조정(무한루프 효과)
slidesWrap.addEventListener('transitionend', () => {
  if (current === slideCount-1) {
    // 마지막(=첫번째 복제)이면, 실제 첫번째 슬라이드로 순간 이동
    goToSlide(1, false);
  }
  if (current === 0) {
    // 처음(=마지막 복제)이면, 실제 마지막 슬라이드로 순간 이동
    goToSlide(slideCount-2, false);
  }
});

// dot 클릭
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i+1, true);
    stopAutoSlide(); autoSlide();
  });
});
nextBtn.addEventListener('click', ()=>{ nextSlide(); stopAutoSlide(); autoSlide(); });
prevBtn.addEventListener('click', ()=>{ prevSlide(); stopAutoSlide(); autoSlide(); });

// 자동 슬라이드
function autoSlide() { timer = setInterval(nextSlide, 3000); }
function stopAutoSlide() { clearInterval(timer); }

// 초기 위치 조정 및 시작
goToSlide(1, false);
autoSlide();
