function randomNumber(min, max) {
    // Calculate the range
    const range = max - min;

    // Generate a random number between 0 and 1
    const random = Math.random();

    // Scale the random number to the specified range and shift it by the minimum value
    const n = random * range + min;

    // Return the generated random number
    return n;
}