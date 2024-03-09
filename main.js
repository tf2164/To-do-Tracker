// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("item-input").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("list-items").appendChild(li);
  }
  document.getElementById("item-input").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}


// function saveList() {

//     var currentListContent = document.querySelector('.position').innerHTML;


//     var listItem = document.createElement('div');
//     listItem.classList.add('saved-list-item');
//     listItem.innerHTML = currentListContent;

  
//     // document.getElementById('stored-lists').appendChild(listItem);
//     document.getElementById('dayOfWeek').appendChild(listItem);
// }


// document.getElementById('saveButton').addEventListener('click', saveList);


// Function to save the current list to the stored lists UI
function saveCurrentList() {
    // Get the day of the week from the input field
    const dayOfWeek = document.getElementById('dayOfWeek').value.trim();

    // Check if the day of the week is entered
    if (!dayOfWeek) {
        alert("Please enter the day of the week.");
        return;
    }

    // Get the list items from the current list
    const listItems = Array.from(document.querySelectorAll('#list-items li')).map(li => li.textContent);

    // Save the day of the week and list items to local storage
    localStorage.setItem(dayOfWeek, JSON.stringify(listItems));

    // Refresh the stored lists UI
    refreshStoredLists();
}

// Function to refresh the stored lists UI
function refreshStoredLists() {
    // Clear the current list items
    const currentList = document.getElementById('list-items');
    currentList.innerHTML = '';

    // Clear the stored lists UI
    const storedListsContainer = document.querySelector('#stored-lists ul');
    storedListsContainer.innerHTML = '';

    // Retrieve saved lists from local storage
    for (let i = 0; i < localStorage.length; i++) {
        const dayOfWeek = localStorage.key(i);
        const listItems = JSON.parse(localStorage.getItem(dayOfWeek));

        // Create a new list element for the stored lists UI
        const storedListElement = document.createElement('li');
        storedListElement.textContent = dayOfWeek; // Set the text content to the day of the week

        // Add click event listener to open the saved list
        storedListElement.addEventListener('click', () => {
            // Clear the current list items
            currentList.innerHTML = '';

            // Add the saved list items to the current list
            listItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                currentList.appendChild(listItem);
            });

            // Set the day of the week input field to the selected day of the week
            document.getElementById('dayOfWeek').value = dayOfWeek;
        });

        // Append the new list element to the stored lists UI
        storedListsContainer.appendChild(storedListElement);
    }
}

// Event listener for the Save Current List button
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveCurrentList);

// Refresh the stored lists UI on page load
window.addEventListener('load', refreshStoredLists);
