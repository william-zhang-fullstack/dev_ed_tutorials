const hero      = document.querySelector('.hero');
const slider    = document.querySelector('.slider');
const logo      = document.querySelector('#logo');
const hamburger = document.querySelector('.hamburger');
const headline  = document.querySelector('.headline');

const tl = new TimelineMax();
tl.fromTo(slider, 1.2, {x: "-100%"}, {x: "0%", ease: Power2.easeInOut})
.fromTo(hero, 1.5, {height: "0%"}, {height: "100%"})
.fromTo(hero, 0.6, {width: "100%"}, {width: "80%"}, "-=0.6")
.fromTo(logo, 0.6, {opacity:0, x: 30}, {opacity: 1, x: 0}, "-=0.6")
.fromTo(hamburger, 0.6, {opacity:0, x: 30}, {opacity: 1, x: 0}, "-=0.6")
.fromTo(headline, 0.6, {opacity:0, x: 30}, {opacity: 1, x: 0}, "-=0.6");
