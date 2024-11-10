const add = (step) => {
    // We gave the number element an id of number so we can use that to get the element
    let numberElement = document.getElementById("number");
    // We can use the innerText property to get the text inside the element
    let number = numberElement.innerText;
          number = parseInt(number) + step;
          numberElement.innerText = number;
};

const minus = (step) => {
    let numberElement = document.getElementById("number");
    let number = numberElement.innerText;
        number = parseInt(number) - step;
        numberElement.innerText = number;
}

const reset = () => {
    document.getElementById('number').innerText = 0;
}

const customNumber = () => {
    const customNumberElement = document.getElementById("input_number");
    const numberElement = document.getElementById("number");
    const customValue = parseInt(customNumberElement.value);

    if (!isNaN(customValue)) {
        // only update if the input is a valid number
        const currentNumber = parseInt(numberElement.innerText) || 0;
        numberElement.innerText = currentNumber + customValue;
        customNumberElement.value = ''; // clear input field
    } else {
        alert("Please enter a valid number.");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.addition[value="+1"]').addEventListener('click', () => add(1));
    document.querySelector('.addition[value="+10"]').addEventListener('click', () => add(10));
    document.querySelector('.subtraction[value="-1"]').addEventListener('click', () => minus(1));
    document.querySelector('.subtraction[value="-10"]').addEventListener('click', () => minus(10));
    document.getElementById('reset').addEventListener('click', reset);
    document.getElementById('input_number').addEventListener('change', customNumber);
});
