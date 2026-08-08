/*=====================================
TLM FOR ALL
SCRIPT.JS PART-1
======================================*/

// ==============================
// Loading Screen
// ==============================

window.addEventListener("load", () => {

document.body.classList.add("loaded");

});

// ==============================
// Dynamic Greeting
// ==============================

const hour = new Date().getHours();

const greeting = document.getElementById("greeting");

if(greeting){

if(hour < 12){

greeting.innerHTML="🌞 Good Morning Teacher";

}

else if(hour <18){

greeting.innerHTML="☀️ Good Afternoon Teacher";

}

else{

greeting.innerHTML="🌙 Good Evening Teacher";

}

}

// ==============================
// Dark Mode
// ==============================

const themeBtn=document.querySelector(".theme-btn");

if(themeBtn){

themeBtn.onclick=()=>{

document.body.classList.toggle("dark-mode");

};

}

// ==============================
// AI Buddy
// ==============================

const buddy=document.querySelector(".ai-buddy-float button");

if(buddy){

buddy.onclick=()=>{

alert("🤖 Hello! I am Hey TLM AI Buddy.\nHow can I help you today?");

};

}

// ==============================
// Smooth Scroll
// ==============================

document.querySelectorAll("a[href^='#']").forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href"))?.scrollIntoView({

behavior:"smooth"

});

});

});

// ==============================
// Search
// ==============================

const searchBtn=document.querySelector(".search-box button");

if(searchBtn){

searchBtn.onclick=()=>{

const value=document.querySelector(".search-box input").value;

if(value===""){

alert("Please enter a Class, Subject or Chapter");

}

else{

alert("Searching : "+value);

}

};

}

// ==============================
// Today's Theme
// ==============================

const themes=[

"🌍 Geography Day",

"📖 Story Day",

"🧪 Science Fun",

"🎬 Cinema Learning",

"🏆 Quiz Day",

"🎨 Creative Day",

"🤖 AI Learning"

];

const todayTheme=document.getElementById("todayTheme");

if(todayTheme){

const day=new Date().getDay();

todayTheme.innerHTML=themes[day];

}

// ==============================
// Quote
// ==============================

const quotes=[

"Every Child Can Learn.",

"Teachers Build The Nation.",

"Learning Never Stops.",

"Think Big Learn Smart.",

"Dream • Learn • Achieve.",

"AI Makes Learning Easier.",

"Believe In Yourself."

];

const quote=document.getElementById("quote");

if(quote){

quote.innerHTML=quotes[new Date().getDay()];

}

// ==============================
// End Part-1
// ==============================
/*=====================================
TLM FOR ALL
SCRIPT.JS PART-2
======================================*/

// ==============================
// Welcome Voice (AI Buddy)
// ==============================

function speak(text){

if(!('speechSynthesis' in window)) return;

speechSynthesis.cancel();

const msg = new SpeechSynthesisUtterance(text);

msg.lang = "en-IN";
msg.rate = 0.95;
msg.pitch = 1.1;
msg.volume = 1;

speechSynthesis.speak(msg);

}

// ==============================
// Welcome Message
// ==============================

window.addEventListener("load",()=>{

setTimeout(()=>{

speak("Welcome to T L M For All. Let's make learning beautiful.");

},1200);

});

// ==============================
// Teacher Login
// ==============================

const teacherLogin=document.querySelector(".login-btn");

if(teacherLogin){

teacherLogin.addEventListener("click",(e)=>{

e.preventDefault();

const pass=prompt("Teacher Login Password");

if(pass==="tlm2026"){

alert("Welcome Teacher");

}else{

alert("Invalid Password");

}

});

}

// ==============================
// Hidden Admin
// Double click logo
// ==============================

const logo=document.querySelector(".logo");

if(logo){

logo.addEventListener("dblclick",()=>{

const admin=prompt("Admin Password");

if(admin==="TLM@Admin"){

alert("Admin Panel");

window.location.href="admin.html";

}else{

alert("Access Denied");

}

});

}

// ==============================
// Scroll Animation
// ==============================

const cards=document.querySelectorAll(

".feature-card,.class-card,.teacher-card,.student-card,.story-card,.ai-card,.library-card"

);

window.addEventListener("scroll",()=>{

cards.forEach(card=>{

const top=card.getBoundingClientRect().top;

if(top<window.innerHeight-100){

card.classList.add("show");

}

});

});

// ==============================
// AI Story
// ==============================

const stories=[

"Be Honest.",

"Help Others.",

"Save Nature.",

"Respect Teachers.",

"Never Give Up.",

"Dream Big.",

"Believe In Yourself."

];

const story=document.getElementById("storyOfDay");

if(story){

story.innerHTML=stories[new Date().getDay()];

}

// ==============================
// Footer Year
// ==============================

const year=document.getElementById("year");

if(year){

year.innerHTML=new Date().getFullYear();

}

// ==============================
// Console
// ==============================

console.log("TLM FOR ALL Loaded Successfully");

/*=====================================
END OF SCRIPT.JS
======================================*/
