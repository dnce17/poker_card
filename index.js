let deck =   {
    "cards": [
      "10_of_clubs.png",
      "10_of_diamonds.png",
      "10_of_hearts.png",
      "10_of_spades.png",
      "2_of_clubs.png",
      "2_of_diamonds.png",
      "2_of_hearts.png",
      "2_of_spades.png",
      "3_of_clubs.png",
      "3_of_diamonds.png",
      "3_of_hearts.png",
      "3_of_spades.png",
      "4_of_clubs.png",
      "4_of_diamonds.png",
      "4_of_hearts.png",
      "4_of_spades.png",
      "5_of_clubs.png",
      "5_of_diamonds.png",
      "5_of_hearts.png",
      "5_of_spades.png",
      "6_of_clubs.png",
      "6_of_diamonds.png",
      "6_of_hearts.png",
      "6_of_spades.png",
      "7_of_clubs.png",
      "7_of_diamonds.png",
      "7_of_hearts.png",
      "7_of_spades.png",
      "8_of_clubs.png",
      "8_of_diamonds.png",
      "8_of_hearts.png",
      "8_of_spades.png",
      "9_of_clubs.png",
      "9_of_diamonds.png",
      "9_of_hearts.png",
      "9_of_spades.png",
      "ace_of_clubs.png",
      "ace_of_diamonds.png",
      "ace_of_hearts.png",
      "ace_of_spades.png",
      "jack_of_clubs.png",
      "jack_of_diamonds.png",
      "jack_of_hearts.png",
      "jack_of_spades.png",
      "king_of_clubs.png",
      "king_of_diamonds.png",
      "king_of_hearts.png",
      "king_of_spades.png",
      "queen_of_clubs.png",
      "queen_of_diamonds.png",
      "queen_of_hearts.png",
      "queen_of_spades.png",
    ]
}

for (let i = 0; i < deck.cards.length; i++) {

    let cardCtnr = document.querySelector(".card-ctnr");
    let newCard = document.createElement("img");

    newCard.className = "card";
    newCard.src = "img/" + deck.cards[i];
    newCard.setAttribute("draggable", false);
    cardCtnr.appendChild(newCard);
}

let cards = document.querySelectorAll(".card");

cards.forEach(item => {
    item.addEventListener("mousedown", function onDown() {
        console.log("working");
        let card = this;
        document.addEventListener("mousemove", function onMove(e) {
            card.style.left = e.clientX - (card.offsetWidth / 2)+ "px";
            card.style.top = e.clientY - (card.offsetHeight / 2) + "px";

            document.addEventListener("mouseup", function onUp() {
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
            });
        });
    });
})

// ADD card img to JSON file, so I don't have to manually do it. Then I copy paste here
function getCards() {
    const fs = require("fs");
    const path = require("path")

    let data = fs.readFileSync("data.json");
    let cardObj = JSON.parse(data);

    const results = fs.readdirSync(path.resolve(__dirname, "img"));
    // console.log(typeof(results[0]));
    // console.log(String(results));

    let cards = {
        "cards": results
    }

    cardObj.push(cards);

    let cardStr = JSON.stringify(cardObj, null, 2);
    fs.writeFile("data.json", cardStr, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("New data added");
        }
    })
}

// this only works if I have nothing running that affects the browser. Maybe it would be smarter
// to put this in a separate js file
// getCards();

// Useful 
// https://stackoverflow.com/questions/1115310/how-can-i-add-a-class-to-a-dom-element-in-javascript
// https://www.geeksforgeeks.org/html-dom-appendchild-method/
// https://www.geeksforgeeks.org/how-to-add-data-in-json-file-using-node-js/