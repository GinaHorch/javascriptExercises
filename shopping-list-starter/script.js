// DOM elements
const newItemText = document.getElementById("new-item-text");
const shoppingListElement = document.getElementById("shopping-list-items")

// array to store shopping list items
let shoppingListItems = ["milk", "eggs", "bread"];

// feedback instead of annoying pop up with alert
const feedback = document.getElementById("feedback");

// function to add new items to shopping list
const addItem = () => {
    const item = newItemText.value.trim(); // trim white space
    
    if (item) { // prevent adding empty items
        shoppingListItems = [...shoppingListItems, item];
        updateItems();
        newItemText.value = ""; // clear the input field
    } else {
        displayFeedback("Please enter an item.");
    }
};

// function to display feedback as a list item
const displayFeedback = (message) => {
    const feedbackItem = document.createElement("li");
    feedbackItem.innerText = message;
    feedbackItem.style.color = "red";

    // append to the list and remove after 3 seconds
    shoppingListElement.appendChild(feedbackItem);
    setTimeout(() => feedbackItem.remove(), 3000);
};

// function to update the list display on the page
const updateItems = () => {
    shoppingListElement.innerHTML = ""; // clear existing items
        
    for (const shoppingItem of shoppingListItems) {
      const itemElement = document.createElement("li");
      itemElement.innerText = shoppingItem;
      shoppingListElement.appendChild(itemElement);
    }
};

const clearList = () => {
    shoppingListItems = []; // clear the shopping List array
    updateItems();
};

updateItems();

// attach event listeners to buttons instead of 'onclick' in html
document.getElementById("new-item-button").addEventListener("click", addItem);
document.getElementById("clear-list-button").addEventListener("click", clearList)