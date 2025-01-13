function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    const offset = -75; 
    const topPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top: topPosition, behavior: 'smooth' });
}

document.querySelector('nav ul li a[href="#about"]').addEventListener('click', function (event) {
    event.preventDefault(); 
    scrollToAbout();
});
