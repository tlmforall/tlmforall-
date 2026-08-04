/* ==========================================
   TLM FOR ALL
   SCRIPT.JS PART-1
========================================== */

document.addEventListener("DOMContentLoaded", function () {

console.log("TLM FOR ALL Loaded Successfully");

/* ==========================================
   DARK MODE
========================================== */

const darkButton = document.querySelector(".header-buttons button:last-child");

if (localStorage.getItem("theme") === "dark") {

document.body.classList.add("dark-mode");

}

if (darkButton) {

darkButton.addEventListener("click", function () {

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){

localStorage.setItem("theme","dark");

darkButton.innerHTML="☀️ Light Mode";

}else{

localStorage.setItem("theme","light");

darkButton.innerHTML="🌙 Dark Mode";

}

});

}

/* ==========================================
   LANGUAGE BUTTON
========================================== */

const languageButton=document.querySelector(".header-buttons button:first-child");

if(languageButton){

languageButton.addEventListener("click",function(){

alert(

"Language Support\n\n" +

"1. Telugu\n" +

"2. Hindi\n" +

"3. English\n\n" +

"(Coming Soon)"

);

});

}

/* ==========================================
   SMOOTH SCROLL
========================================== */

const links=document.querySelectorAll("nav a");

links.forEach(function(link){

link.addEventListener("click",function(e){

const target=this.getAttribute("href");

if(target.startsWith("#")){

e.preventDefault();

document.querySelector(target).scrollIntoView({

behavior:"smooth"

});

}

});

});

/* ==========================================
   STORY OF THE DAY
========================================== */

const stories=[

"Honesty is the Best Policy",

"The Clever Crow",

"The Lion and the Mouse",

"Akbar Birbal Wisdom",

"Tenali Rama Intelligence",

"Panchatantra Moral Story"

];

const today=new Date().getDate();

const selectedStory=stories[today%stories.length];

console.log("Today's Story :",selectedStory);

});
/* ==========================================
   HERO ANIMATION
========================================== */

const hero=document.querySelector(".hero");

if(hero){

hero.style.opacity="0";

hero.style.transform="translateY(40px)";

setTimeout(()=>{

hero.style.transition="1s";

hero.style.opacity="1";

hero.style.transform="translateY(0px)";

},300);

}

/* ==========================================
   CLASS CARDS
========================================== */

const classCards=document.querySelectorAll(".class-card");

classCards.forEach(card=>{

card.addEventListener("click",()=>{

const className=card.innerText;

alert(

"Opening "+className+

"\n\n(Content Coming Soon)"

);

});

});

/* ==========================================
   AI STORY CARDS
========================================== */

const storyCards=document.querySelectorAll(".story-card");

storyCards.forEach(card=>{

card.addEventListener("click",()=>{

alert(

"AI Story Module\n\n"+

card.innerText+

"\n\nComing Soon."

);

});

});

/* ==========================================
   AI CENTER CARDS
========================================== */

const aiCards=document.querySelectorAll(".ai-card");

aiCards.forEach(card=>{

card.addEventListener("click",()=>{

alert(

card.innerText+

"\n\nAI Module Under Development"

);

});

});

/* ==========================================
   SEARCH PLACEHOLDER
========================================== */

function searchContent(){

let keyword=prompt(

"Search in TLM FOR ALL"

);

if(keyword){

alert(

"Searching for : "+keyword+

"\n\n(Search Feature Coming Soon)"

);

}

}

/* ==========================================
   WELCOME MESSAGE
========================================== */

setTimeout(()=>{

console.log(

"Welcome to TLM FOR ALL"

);

},1000);

/* ==========================================
   LOADING ANIMATION
========================================== */

window.addEventListener("load",()=>{

document.body.style.transition=".5s";

document.body.style.opacity="1";

});

/* ==========================================
   SIMPLE BUTTON HOVER EFFECT
========================================== */

const buttons=document.querySelectorAll(".btn,.btn2");

buttons.forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="scale(1.05)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});
/* ==========================================
   FIREBASE READY (Placeholder)
========================================== */

function initializeFirebase(){

console.log("Firebase Ready");

}

/* ==========================================
   LOGIN
========================================== */

function teacherLogin(){

alert(

"Teacher Login\n\nComing Soon"

);

}

function studentLogin(){

alert(

"Student Login\n\nComing Soon"

);

}

function logoutUser(){

alert(

"Logout Successful"

);

}

/* ==========================================
   LANGUAGE SWITCH
========================================== */

function changeLanguage(language){

localStorage.setItem("language",language);

alert(

"Language Changed : "+language

);

}

/* ==========================================
   STORY OF THE DAY
========================================== */

const storyTitle=document.querySelector("#story-title");

if(storyTitle){

storyTitle.innerHTML=selectedStory;

}

/* ==========================================
   TODAY'S QUOTE
========================================== */

const quotes=[

"Education is the key to success.",

"Learning never stops.",

"Dream Big, Study Smart.",

"Teachers Inspire Generations.",

"Knowledge Changes Lives."

];

const todayQuote=quotes[new Date().getDay()];

console.log(todayQuote);

/* ==========================================
   NAVIGATION ACTIVE
========================================== */

const menuItems=document.querySelectorAll("nav ul li a");

menuItems.forEach(item=>{

item.addEventListener("click",()=>{

menuItems.forEach(link=>{

link.classList.remove("active");

});

item.classList.add("active");

});

});

/* ==========================================
   FUTURE MODULES
========================================== */

console.log("Future Modules");

console.log("Firebase Authentication");

console.log("Firestore");

console.log("AI Stories");

console.log("AI Video");

console.log("Teacher Dashboard");

console.log("Student Dashboard");

console.log("Question Paper Generator");

console.log("PPT Generator");

console.log("Digital Library");

/* ==========================================
   INITIALIZE
========================================== */

initializeFirebase();

console.log("TLM FOR ALL Ready");
