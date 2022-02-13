document.addEventListener("DOMContentLoaded", () => {
    
    createSquares();
    initHelpModal();
    initStatsModal();    

    let guessedWords = [[]];
    let availableSpace = 1;

    let word = "crane";
    let guessedWordCount = 0;


    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if(currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
        if(currentWordArr.length == 5) {
            console.log(currentWordArr);
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) {
            window.alert("Word must be 5 letters");
        }

        const currentWord = currentWordArr.join("");

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });

        guessedWordCount += 1;

        // if (currentWord === word) {
        //     window.alert("Right word");
        // }

        if (guessedWords.length === 6) {
            window.alert(`No more guesses. The word is ${word}.`);
        }

        guessedWords.push([]);
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1));

        lastLetterEl.textContent = "";
        availableSpace = availableSpace - 1;
    }

    const keys = document.querySelectorAll(".keyboard-row button");

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === "enter") {
                handleSubmitWord();
                return;
            }

            if (letter === "del") {
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter);
        };
    }

    function initHelpModal() {
        const modal = document.getElementById("help-modal");

        //Get the button that opens the modal
        const btn = document.getElementById("help");

        //Get the <span> element that closes the modal
        const span = document.getElementById("close-help");

        //When the user clicks on the button, open the modal
        btn.addEventListener("click", function () {
            modal.style.display = "block";
        });

        //When the user clicks on <span> (x), close the modal
        span.addEventListener("click", function () {
            modal.style.display = "none";
        });

        //When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    function initStatsModal() {
        const modal = document.getElementById("stats-modal");

        //Get the button that opens the modal
        const btn = document.getElementById("stats");

        //Get the <span element that closes the modal
        const span = document.getElementById("close-stats");

        //When the user clicks on the button, open the modal
        btn.addEventListener("click", function () {
            //updateStatsModal();
            modal.style.display = "block";
        });

        //When the user clicks on <span> (x), close the modal
        span.addEventListener("click", function () {
            modal.style.display = "none";
        });

        //When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

});