// define the time limit
let TIME_LIMIT = 60;

// define quotes to be used
let quotes_array = [
  "Just when I thought I was out, they pull me back in.",
  "Keep the change, ya filthy animal",
  "Hasta La Vista, baby",
  "You can't handle the truth!",
  "You're killin' me, Smalls",
  "Life is like a box of chocolates, you never know what you're gonna get",
  "Now that's some high quality H20",
  "Get busy livin', or get busy dyin'",
  "Houston, we have a problem",
  "They may take our lives, but they'll never take our freedom!",
  "Show me the money!",
  "Do you like scary movies?",
  "The first rule of fight club is, you do not talk about fight club",
  "How you like them apples?"
];

// selecting required elements
let timer_text = document.querySelector(".currentTime");
let accuracy_text = document.querySelector(".speedAccuracy");
let error_text = document.querySelector(".currentError");
let cpm_text = document.querySelector(".currentCPM");
let wpm_text = document.querySelector(".currentWPM");
let quote_text = document.querySelector(".movieQuote");
let input_area = document.querySelector(".inputBox");
let restartButton = document.querySelector(".restartButton");
let cpm_group = document.querySelector(".charactersPerMinute");
let wpm_group = document.querySelector(".wordsPerMinute");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];
  
    // separate each character and make an element 
    // out of each of them to individually style them
    current_quote.split('').forEach(char => {
      const charSpan = document.createElement('span')
      charSpan.innerText = char
      quote_text.appendChild(charSpan)
    })
  
    // roll over to the first quote
    if (quoteNo < quotes_array.length - 1)
      quoteNo++;
    else
      quoteNo = 0;
  }
  
  function processCurrentText() {

    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');
  
    // increment total characters typed
    characterTyped++;
  
    errors = 0;
  
    let quoteSpans = quote_text.querySelectorAll('span');

    quoteSpans.forEach((char, index) => {
      let typedChar = curr_input_array[index];
  
  
      // character not currently typed
      if (typedChar == null) {
        char.classList.remove('correct_char');
        char.classList.remove('incorrect_char');
  
        // correct character
      } else if (typedChar === char.innerText) {
        char.classList.add('correct_char');
        char.classList.remove('incorrect_char');
  
        // incorrect character
      } else {
        char.classList.add('incorrect_char');
        char.classList.remove('correct_char');
  
        // increment number of errors
        errors++;
      }
    });
  
    // display the number of errors
    error_text.textContent = total_errors + errors;
  
    // update accuracy text
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);
  
    // if current text is completely typed
    // irrespective of errors
    if (curr_input.length == quoteSpans.length) {
      updateQuote();
  
      // update total errors
      total_errors += errors;
  
      // clear the input area
      input_area.value = "";
    }
  }

  function startGame() {

    resetValues();
    updateQuote();
  
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }
  
  function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;
  
    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restartButton.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
  }
  
  function updateTimer() {
    if (timeLeft > 0) {
      // decrease the current time left
      timeLeft--;
  
      // increase the time elapsed
      timeElapsed++;
  
      // update the timer text
      timer_text.textContent = timeLeft + "s";
    }
    else {
      // finish the game
      finishGame();
    }
  }
  
  function finishGame() {
    // stop the timer
    clearInterval(timer);
  
    // disable the input area
    input_area.disabled = true;
  
    // show finishing text
    quote_text.textContent = "Click on restart to start a new game.";
  
    // display restart button
    restartButton.style.display = "block";
  
    // calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
  
    // update cpm and wpm text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;
  
    // display the cpm and wpm
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
  }
  