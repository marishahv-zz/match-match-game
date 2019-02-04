const MemoryGame = function (cards) {
   this.cards = this.shuffleCard(cards);
   this.openedCards = [];
   this.pairsGuessed = [];
   this.pairsCount = cards.length / 2;   
};

 MemoryGame.prototype.shuffleCard = function (cardsArr){
    let currentIndex = cardsArr.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;     
  
      // And swap it with the current element.
      temporaryValue = cardsArr[currentIndex];
      cardsArr[currentIndex] = cardsArr[randomIndex];
      cardsArr[randomIndex] = temporaryValue;
    }
    return cardsArr;
};

MemoryGame.prototype.checkIfPair = function(card1, card2){
  let IfPair = this.openedCards[0].lastChild.getAttribute("name") === this.openedCards[1].lastChild.getAttribute("name") ? true : false;
  if(IfPair){
    this.pairsGuessed.push(card1);
  }
  return IfPair;
}

MemoryGame.prototype.openCard = function(card){
  if(this.openedCards.length < 2){
    this.openedCards.push(card);
    card.firstChild.classList.add("transform-rotate");
    card.classList.add("animate-rotate");
    card.classList.add("opened");
  }
};

MemoryGame.prototype.closeCards = function (card1, card2){
  card1.classList.add("animate-reverse");
  card2.classList.add("animate-reverse");
};

MemoryGame.prototype.removeCards = function(card1, card2){
  card1.lastChild.classList.add("transform-disapear");
  card2.lastChild.classList.add("transform-disapear");

  card1.classList.add("animate-disapear");
  card2.classList.add("animate-disapear");
};

MemoryGame.prototype.finished = function(userName){  
  let congratsParagraph = document.querySelector(".congrats");
  congratsParagraph.querySelector("span").innerHTML = userName;
  congratsParagraph.classList.remove("hidden");
};
