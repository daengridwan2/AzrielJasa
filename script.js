// Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-menu")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
  })
}

// Navbar Scroll Effect
const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.classList.add("navbar-solid")
  } else {
   
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
      navbar.classList.remove("navbar-solid")
    }
  }

  lastScroll = currentScroll
})

// Hero Carousel
const slides = document.querySelectorAll(".hero-slide")
const dots = document.querySelectorAll(".carousel-dot")
let currentSlide = 0
let carouselInterval

function showSlide(index) {
  if (!slides.length) return

  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => {
    dot.classList.remove("bg-yellow-400")
    dot.classList.add("bg-white", "bg-opacity-50")
  })

  currentSlide = (index + slides.length) % slides.length
  slides[currentSlide].classList.add("active")

  if (dots[currentSlide]) {
    dots[currentSlide].classList.remove("bg-white", "bg-opacity-50")
    dots[currentSlide].classList.add("bg-yellow-400")
  }
}

function startCarousel() {
  carouselInterval = setInterval(() => {
    showSlide(currentSlide + 1)
  }, 10000)
}

if (slides.length) {
  startCarousel()

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(carouselInterval)
      showSlide(index)
      startCarousel()
    })
  })
}

// Auto advance carousel
if (slides.length > 0) {
  setInterval(() => {
    showSlide(currentSlide + 1)
  }, 10000)
}

// Carousel dot click handlers
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index)
  })
})

// Testimonial Carousel Auto-Scroll
const testimonialTrack = document.getElementById('testimonial-track');
if (testimonialTrack) {
    // Clone children to ensure continuous scrolling
    // We clone all items once to ensure we have enough buffer
    const items = Array.from(testimonialTrack.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        testimonialTrack.appendChild(clone);
    });

    const moveCarousel = () => {
        const firstSlide = testimonialTrack.firstElementChild;
        if (!firstSlide) return;
        
        const slideWidth = firstSlide.offsetWidth;
        
        testimonialTrack.style.transition = 'transform 0.7s ease-in-out';
        testimonialTrack.style.transform = `translateX(-${slideWidth}px)`;
        
        const transitionEndHandler = () => {
            testimonialTrack.style.transition = 'none';
            testimonialTrack.style.transform = 'translateX(0)';
            testimonialTrack.appendChild(firstSlide); 
            testimonialTrack.removeEventListener('transitionend', transitionEndHandler);
        };
        
        testimonialTrack.addEventListener('transitionend', transitionEndHandler);
    };

    let testimonialInterval = setInterval(moveCarousel, 3000);

   
    testimonialTrack.parentElement.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    testimonialTrack.parentElement.addEventListener('mouseleave', () => testimonialInterval = setInterval(moveCarousel, 3000));
}


function toggleRequirement(button) {
    const card = button.closest(".service-card")
    const requirement = card.querySelector(".requirement")
    requirement.classList.toggle("hidden")
    button.querySelector("i").classList.toggle("rotate-180")
}



const accordionHeaders = document.querySelectorAll(".accordion-header")

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling
    const icon = header.querySelector(".fa-chevron-down")

    // Close all other accordions
    accordionHeaders.forEach((otherHeader) => {
      if (otherHeader !== header) {
        const otherContent = otherHeader.nextElementSibling
        const otherIcon = otherHeader.querySelector(".fa-chevron-down")
        otherContent.classList.remove("active")
        otherIcon.style.transform = "rotate(0deg)"
      }
    })

    // Toggle current accordion
    content.classList.toggle("active")
    if (content.classList.contains("active")) {
      icon.style.transform = "rotate(180deg)"
    } else {
      icon.style.transform = "rotate(0deg)"
    }
  })
})

const galleryItems = document.querySelectorAll(".gallery-item")
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")
const closeBtn = document.querySelector(".lightbox .close")

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img")
    lightbox.classList.add("active")
    lightboxImg.src = img.src
    document.body.style.overflow = "hidden"
  })
})

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active")
    document.body.style.overflow = "auto"
  })
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active")
      document.body.style.overflow = "auto"
    }
  })
}

const contactForm = document.getElementById("contact-form")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const whatsapp = document.getElementById("whatsapp").value
    const service = document.getElementById("service").value
    const message = document.getElementById("message").value

   
    const waMessage = `Halo, saya ${name}%0A%0ALayanan: ${service}%0A%0APesan:%0A${message}%0A%0ANomor WhatsApp: ${whatsapp}`

    
    window.open(`https://wa.me/6281234567890?text=${waMessage}`, "_blank")

  
    contactForm.reset()
  })
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

function animateCounter(element) {
  const target = Number.parseFloat(element.getAttribute("data-target"))
  const duration = 2000 
  const increment = target / (duration / 16) 
  let current = 0
  const isDecimal = target % 1 !== 0

  const updateCounter = () => {
    current += increment
    if (current < target) {
      element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = isDecimal ? target.toFixed(1) : target
    }
  }

  updateCounter()
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        entry.target.classList.add("counted")
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target) // Only animate once
      }
    })
  },
  {
    threshold: 0.5,
  },
)

document.querySelectorAll(".counter").forEach((counter) => {
  counterObserver.observe(counter)
})
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in")
    }
  })
}, observerOptions)

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el)
})
const progressBar = document.getElementById('scroll-progress')
window.addEventListener('scroll', () => {
  if(!progressBar) return
  const scrollTop = window.scrollY
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / documentHeight) * 100

  progressBar.style.width = `${scrollPercent}%`
})





