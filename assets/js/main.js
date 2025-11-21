/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


/*===== CONTACT SUBMISSION =====*/
/**
 * showAlert(type, message, timeout)
 * type: "success" | "error" | "warning" | "info"
 * message: string
 * timeout: milliseconds to auto-dismiss (optional, defaults to 4000)
 */
function showAlert(type, message, timeout = 4000) {
    const container = document.getElementById('alerts');
    if(!container) return;

    const alertEl = document.createElement('div');
    alertEl.className = `alert ${type}`;

    const icon = document.createElement('span');
    icon.className = 'alert-icon';
    // Simple icons per type (can be adjusted)
    const icons = { success: '✔️', error: '⚠️', warning: '⚠️', info: 'ℹ️' };
    icon.textContent = icons[type] || '';

    const msg = document.createElement('span');
    msg.className = 'alert-message';
    msg.textContent = message;

    const close = document.createElement('button');
    close.className = 'alert-close';
    close.type = 'button';
    close.innerHTML = '×';
    close.addEventListener('click', () => {
        if (alertEl.parentElement) alertEl.parentElement.removeChild(alertEl);
    });

    alertEl.appendChild(icon);
    alertEl.appendChild(msg);
    alertEl.appendChild(close);

    // prepend so newest is on top for center layout
    if (container.firstChild) container.insertBefore(alertEl, container.firstChild);
    else container.appendChild(alertEl);

    // Auto-dismiss
    if (timeout > 0) {
        setTimeout(() => {
            if (alertEl.parentElement) alertEl.parentElement.removeChild(alertEl);
        }, timeout);
    }
}

function contactSubmit() {
    const form = document.querySelector('.contact__form');
    if (!form) return;

    // Basic validation (HTML required attributes already handle most)
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
        showAlert('warning', 'Please fill in all fields.');
        return;
    }

    // Here you could send the data to a server using fetch/AJAX.
    // For now we show a success alert, reset the form, and scroll to home.
    showAlert('success', 'Thank you for contacting me! Your message has been sent successfully.');
    form.reset();

    // Optional: navigate to home after a short delay so user sees the alert
    setTimeout(() => { window.location.href = '#home'; }, 700);
}