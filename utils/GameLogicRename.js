// tesing GameLogic file name???

// function to generate the target number
export const generateTarget = (phoneNum) => {
    const lastDigit = phoneNum % 10;
    const multiples = [];
    for (let i = 1; i <= 100; i++) {
        if (i % lastDigit === 0) {
            multiples.push(i);
        }
    }
    const randomNumber = Math.floor(Math.random() * multiples.length);
    console.log(multiples[randomNumber]);
    return multiples[randomNumber];
};

// function to check the guess
export const checkGuess = (guess, number, phoneNum) => {
    if (
        isNaN(guess) 
        || guess < 1 
        || guess > 100
        // or if guess is not a multiple of the last digit of the phone number
        || guess % (phoneNum % 10) !== 0
    ) {
        return "Invalid input";
    } else if (guess < number) {
        return 'too low';
    } else if (guess > number) {
        return 'too high';
    } else {
        return 'Congratulations!';
    }
};

// function to check if the game is over
export const checkGameOver = (timer, attempts) => {
    return timer <= 0 || attempts <= 0;
};