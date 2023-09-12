const BASE_URL = "https://deckofcardsapi.com";
let deckID;

/**
 * sends request to deckofcardsapi to return a unique
 * deck id, that is used for drawing cards
 *
 */
async function getDeckId() {

  const response = await fetch(`${BASE_URL}/api/deck/new/shuffle`);
  const data = await response.json();
  deckID = data.deck_id;

}

/** loads a unique card from a deck with the deck ID
 * if the card rendered is the last card in the deck, it will
 * hide the Gimme a Card button
 */
async function getCard() {

  const response = await fetch(`${BASE_URL}/api/deck/${deckID}/draw`);
  const data = await response.json();

  if (data.remaining === 0) $("#card-button").hide();

  const card = data.cards[0];

  $("#card-area").append($("<img>", {src:card.image, width:150}));
  // create css class for cards and write stuff in that
}

/** allows a deck ID to be generated upon loading the page */


getDeckId()
/** generates a card on the DOM when clicked */
$("#card-button").on("click", getCard);
