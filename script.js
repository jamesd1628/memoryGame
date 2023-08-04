const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
let shuffledColors = shuffle(COLORS);


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let colorTrack = []
const allDivs = gameContainer.getElementsByTagName("div")
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const currentDiv = event.target
  currentDiv.style.background = currentDiv.classList.value
  // if empty then click is first choice
  if (colorTrack.length == 0){
    colorTrack.push(currentDiv)
  // if not then it is second choice. but ensure that it isn't the same div
  } else if (currentDiv != colorTrack[0]){
    // if colors match then leave as if and empty our the colortrack
    if(currentDiv.classList.value == colorTrack[0].classList.value){
      console.log("Match on", currentDiv.classList.value)
      colorTrack = []
    // if colors do not match, then set timer function and clear both background colors after .5 seconds
    } else {
      console.log("No Match")
      setTimeout(function() {
        colorTrack[0].style.background = ''
        currentDiv.style.background = ''
        colorTrack = []
      }, 500)
    }
    for (i=0; i<allDivs.length; i++) {
      allDivs[i].classList.add("avoid-clicks")
    }
    setTimeout(function() {
      for (i=0; i<allDivs.length; i++) {
        allDivs[i].classList.remove("avoid-clicks")
      }
    }, 500)
  } else{
    console.log("Invalid selection")
  }
  
}

// when the DOM loads
createDivsForColors(shuffledColors);
