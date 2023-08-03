const fs = require('fs');

// Function to read the JSON data from cards.json file
function getCardsData() {
  try {
    // Add 'utf8' as the second argument to readFileSync to specify the character encoding
    const rawData = fs.readFileSync('cards.json', 'utf8');
    const cardsData = JSON.parse(rawData);
    return cardsData;
  } catch (error) {
    console.error('Error reading cards.json file:', error.message);
    return null;
  }
}

// Get the cards data
var cardsData = getCardsData();

// Check if the data was successfully read
if (cardsData) {
  console.log('Cards data retrieved successfully:');
  console.log(cardsData);
}

export var playerHand = [];


export function drawcard(){
    if (cardsData.card.length === 0) {
        cardsData = getCardsData();
    } else {
        var cardIndex = Math.floor(Math.random() * cardsData.card.length);
        var card = cardsData.card.splice(cardIndex, 1)[0];
        playerHand.push(card);
    }
}