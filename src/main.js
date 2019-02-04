
const cards = {
  low: [
    { name: 'aquaman',         img: 'aquaman.jpg' },
    { name: 'batman',          img: 'batman.jpg' },
    { name: 'captain-america', img: 'captain-america.jpg' },
    { name: 'fantastic-four',  img: 'fantastic-four.jpg' },
    { name: 'flash',           img: 'flash.jpg' },
    { name: 'green-arrow',     img: 'green-arrow.jpg' }, 
    { name: 'aquaman',         img: 'aquaman.jpg' },
    { name: 'batman',          img: 'batman.jpg' },
    { name: 'captain-america', img: 'captain-america.jpg' },
    { name: 'fantastic-four',  img: 'fantastic-four.jpg' }, 
    { name: 'flash',           img: 'flash.jpg' },
    { name: 'green-arrow',     img: 'green-arrow.jpg' }
  ],
  medium: [
    { name: 'aquaman',         img: 'aquaman.jpg' },
    { name: 'batman',          img: 'batman.jpg' },
    { name: 'captain-america', img: 'captain-america.jpg' },
    { name: 'fantastic-four',  img: 'fantastic-four.jpg' },
    { name: 'flash',           img: 'flash.jpg' },
    { name: 'green-arrow',     img: 'green-arrow.jpg' },
    { name: 'green-lantern',   img: 'green-lantern.jpg' },
    { name: 'ironman',         img: 'ironman.jpg' },
    { name: 'spiderman',       img: 'spiderman.jpg' },
    { name: 'aquaman',         img: 'aquaman.jpg' },
    { name: 'batman',          img: 'batman.jpg' },
    { name: 'captain-america', img: 'captain-america.jpg' },
    { name: 'fantastic-four',  img: 'fantastic-four.jpg' },
    { name: 'flash',           img: 'flash.jpg' },
    { name: 'green-arrow',     img: 'green-arrow.jpg' },
    { name: 'green-lantern',   img: 'green-lantern.jpg' },
    { name: 'ironman',         img: 'ironman.jpg' },
    { name: 'spiderman',       img: 'spiderman.jpg' }
  ],
  high: [
    { name: 'aquaman',         img: 'aquaman.jpg' },
    { name: 'batman',          img: 'batman.jpg' },
    { name: 'captain-america', img: 'captain-america.jpg' },
    { name: 'fantastic-four',  img: 'fantastic-four.jpg' },
    { name: 'flash',           img: 'flash.jpg' },
    { name: 'green-arrow',     img: 'green-arrow.jpg' },
    { name: 'green-lantern',   img: 'green-lantern.jpg' },
    { name: 'ironman',         img: 'ironman.jpg' },
    { name: 'spiderman',       img: 'spiderman.jpg' },
    { name: 'superman',        img: 'superman.jpg' },
    { name: 'the-avengers',    img: 'the-avengers.jpg' },
    { name: 'thor',            img: 'thor.jpg' },
    { name: 'aquaman',         img: 'aquaman.jpg' },
    { name: 'batman',          img: 'batman.jpg' },
    { name: 'captain-america', img: 'captain-america.jpg' },
    { name: 'fantastic-four',  img: 'fantastic-four.jpg' },
    { name: 'flash',           img: 'flash.jpg' },
    { name: 'green-arrow',     img: 'green-arrow.jpg' },
    { name: 'green-lantern',   img: 'green-lantern.jpg' },
    { name: 'ironman',         img: 'ironman.jpg' },
    { name: 'spiderman',       img: 'spiderman.jpg' },
    { name: 'superman',        img: 'superman.jpg' },
    { name: 'the-avengers',    img: 'the-avengers.jpg' },
    { name: 'thor',            img: 'thor.jpg' }],
  current: ""  
};

let memoryGame; 
const contentWrapper = document.querySelector(".content-wrapper");
const cardsContainer = document.querySelector(".grid-container");
const menuItemStart = document.querySelector(".start-button a");
const menuItemDifficulty = document.querySelector(".menu-item-left a");
const menuItemSkirt = document.querySelector(".menu-item-right a");
const difficultyDropdown = document.querySelector(".menu-item-left .dropdown");  
const skirtDropdown = document.querySelector(".menu-item-right .dropdown");   
const btnCreateProfile = contentWrapper.querySelector("#submit");

window.onload = () => {    
  utils = new Utils();  
  cardsContainer.classList.add("hidden");
}; 

const menuItemSkirt_clickHandler = (evt) => { 
  skirtDropdown.classList.toggle("hidden");
};

const menuItemDifficulty_clickHandler = (evt) => { 
  difficultyDropdown.classList.toggle("hidden");
};

const menuItemStart_clickHandler = (evt) => {
  memoryGame = new MemoryGame(cards[cards.current] || cards.low);
  
  if(utils.getInterval_ID()){
    utils.stopTimer();
  }  
  if(!("profile" in localStorage)){
    alert("Please, fill in profile!")
  } else {    
    closeDropdown();
    document.querySelector(".congrats").classList.add("hidden");
    contentWrapper.classList.add("hidden");   
    cardsContainer.classList.remove("hidden");  
    displayCards();
    utils.startTimer(document.querySelector("time"));  
  }
};

const difficultyDropdown_clickHandler = (evt) => {  
  if(evt.target.tagName == "SPAN"){
    cards.current = evt.target.innerHTML.toLowerCase();
    makeItemActive(evt.target);  
  }
  else return;
}

const skirtDropdown_clickHandler = (evt) => {  
  if(evt.target.tagName == "DIV"){    
    let skirtColor = window.getComputedStyle(evt.target).backgroundColor;

    // As of Chrome 64 you'll need to use a local development server
    // to test functionality that depends on the CSS Object Model.
    //https://stackoverflow.com/questions/48753691/cannot-access-cssrules-from-local-css-file-in-chrome-64/49160760#49160760
    let cssRulesList = document.styleSheets[0].cssRules;

    for(let i = 0; i < cssRulesList.length; i++){
      if(cssRulesList[i].selectorText == ".front-side"){
        cssRulesList[i].style.backgroundColor = skirtColor;
        break;
      }
    }    
    makeItemActive(evt.target); 
  }
  else return;
};

const closeDropdown = () => {
  if(!difficultyDropdown.classList.contains("hidden")){
    difficultyDropdown.classList.toggle("hidden");
  }
  if(!skirtDropdown.classList.contains("hidden")){
    skirtDropdown.classList.toggle("hidden");
  } 
}

const makeItemActive = (element) => {
  let activeItem = element.parentElement.querySelector(".active");
  if(activeItem){
    activeItem.classList.toggle("active");
  }    
  element.classList.toggle("active");
};

const displayCards = () => {
  let html = '';   
  memoryGame.cards.forEach(function (picture, index) {

    // For debugging purposes replace --index-- with --picture.name--
    html += '<div class= "grid-item" id="card_' + index + '">';  
    html += '<div class="back-side">';
    html += '<img src="img/' + picture.img + '" alt="card">';
    html += '</div>';
    html += '<div class="front-side"';
    html += '    name="'       + picture.img +  '">';
    html += '</div>';   
    html += '</div>';  
  }); 
  document.querySelector('.grid-container').innerHTML = html;
};

const removeAnimation = (element) => {
  element.classList.remove("animate-rotate");
  element.classList.remove("opened");
  element.classList.remove("animate-reverse");
  element.firstChild.classList.remove("transform-rotate");
};

const btnCreateProfile_clickHandler = (evt) => {
  let profile = {
    firstName: document.getElementById("firstname").value,
    lastName: document.getElementById("lastname").value,
    email: document.getElementById("email").value
  };
  utils.createProfile(profile);
}

const gridItem_clickHandler = (evt) => {
  closeDropdown();
  let target = evt.target; 

  if(target.className == "front-side" && !target.parentElement.classList.contains("opened")){ 
    let gridItem = target.parentElement;
    memoryGame.openCard(gridItem);         
  } 
  else return;
};

let rotateAnimationCount = 0;
let reverseAnimationCount = 0;
let disapearAnimationCount = 0;
let firstCard;
let secondCard;

const animationEndHandler = (evt) => {
  switch (evt.animationName) {   
    case "rotate": 
      rotateAnimationCount++; 
      if(rotateAnimationCount == 2 && memoryGame.openedCards.length == 2){
        firstCard = memoryGame.openedCards[0];
        secondCard = memoryGame.openedCards[1];

        let ifPair = memoryGame.checkIfPair(firstCard, secondCard);

        if(!ifPair){
          setTimeout(() => {              
            memoryGame.closeCards(firstCard, secondCard);                        
          }, 500);
        } 
        else 
          setTimeout(() => {                 
            memoryGame.removeCards(firstCard, secondCard);             
            removeAnimation(firstCard);
            removeAnimation(secondCard);
            memoryGame.openedCards = [];
          }, 500); 
        rotateAnimationCount = 0;
      }
    break;   
    case "rotate-reverse": 
      reverseAnimationCount++;

      if(reverseAnimationCount == 2){  
        removeAnimation(firstCard);
        removeAnimation(secondCard);

        memoryGame.openedCards = [];
        reverseAnimationCount = 0;        
      }
    break; 
    case "disapear":
      disapearAnimationCount++;
      if (disapearAnimationCount == 2){

        if(memoryGame.pairsGuessed.length == memoryGame.pairsCount){
          cardsContainer.classList.add("hidden");                
          memoryGame.finished(utils.getUserName());
          utils.stopTimer(); 
          utils.updateTimeCollection(utils.getTotalTime());          
        } 
        disapearAnimationCount = 0; 
      } 
    break;    
  }
}; 

cardsContainer.addEventListener("click", gridItem_clickHandler, false);
cardsContainer.addEventListener("animationend", animationEndHandler, false);
menuItemSkirt.addEventListener("click", menuItemSkirt_clickHandler, false);
menuItemDifficulty.addEventListener("click", menuItemDifficulty_clickHandler, false); 
menuItemStart.addEventListener("click", menuItemStart_clickHandler, false);
difficultyDropdown.addEventListener("click", difficultyDropdown_clickHandler, false);
skirtDropdown.addEventListener("click", skirtDropdown_clickHandler, false);
btnCreateProfile.addEventListener("click", btnCreateProfile_clickHandler);


