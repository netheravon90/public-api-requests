

// Global Declarations

const userDataURL = 'https://randomuser.me/api/?results=12&inc=name,picture,email,phone,dob,location&nat=us';
const gallery = document.getElementById('gallery');
const searchBar = document.querySelector('.search-container');

const modals = document.createElement('div');
modals.classList.add('modal-container');
modals.style.display = 'none'
const singleModal = document.getElementsByClassName("modal");

const nameList = document.getElementsByClassName('modal-name');
let usersData;




// ---------------------------------
// FETCH FUNCTIONS
// ---------------------------------
fetch(userDataURL)
    .then( checkStatus )
    .then( response => response.json() )
    .then( data => {
        usersData = data.results;
        console.log(usersData);
        generateEmployeeData(usersData);
        generateModal(usersData)
    })
    .then ( generateSearchBar() )

    .catch( error => console.log ('An error has occured.', error) )

// ---------------------------------
// HELPER FUNCTIONS
// ---------------------------------

// Check Status of API
function checkStatus(response) {
    if (response.ok){
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.status))
    }
}

// Generate Employee Data
function generateEmployeeData(users) {
    gallery.innerHTML = '';
    for (let i = 0; i < users.length; i++){
        let html =  `
        <div class="card" data-index="${[i]}">
            <div class="card-img-container">
                <img class="card-img" src="${users[i].picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="employee-name" class="card-name cap">${users[i].name.first} ${users[i].name.last}</h3>
                <p class="card-text">${users[i].email}</p>
                <p class="card-text cap">${users[i].location.city}, ${users[i].location.state}</p>
            </div>
        </div>
        `
        gallery.insertAdjacentHTML('beforeend', html);
    }
 }



// Generate Modals for Employees
function generateModal(users) {
    modals.innerHTML = '';
    for (let i = 0; i < users.length; i++){
        const date = new Date (users[i].dob.date);
        let html = 
            `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${users[i].picture.medium}" alt="profile picture">
                    <h3 id="modal-name" class="modal-name cap">${users[i].name.first} ${users[i].name.last}</h3>
                    <p class="modal-text">${users[i].email}</p>
                    <p class="modal-text cap">${users[i].location.city}</p>
                    <hr>
                    <p class="modal-text">${users[i].phone}</p>
                    <p class="modal-text">${users[i].location.street.number} ${users[i].location.street.name}, ${users[i].location.city}, ${users[i].location.state}, ${users[i].location.postcode} </p>
                    <p class="modal-text">Birthday: ${date.toLocaleDateString()}</p>
            </div>

            <div class="modal-btn-container">
                <button type="button" class="modal-prev btn">Prev</button>
                <button type="button" class="modal-next btn">Next</button>
            </div>
            `
        document.body.appendChild(modals);
        modals.insertAdjacentHTML('beforeend',html);
        singleModal[i].style.display = "none";
    }

    // Hide 'Prev' Button for First Modal and 'Next' Button for Last Modal
    const firstPrevBtn = document.getElementsByClassName('modal-prev')[0]
    const lastNextBtn = document.getElementsByClassName('modal-next')[singleModal.length - 1]
    const btnContainer = document.getElementsByClassName('modal-btn-container')[0];
    firstPrevBtn.style.display = 'none';
    lastNextBtn.style.display = 'none';

    // Hide modal-btn-container if there is only 1 user.
    if (users.length === 1){      
        btnContainer.style.display = 'none';
    } else {
        btnContainer.style.display = '';
    }
}


// Create Search Bar UI

function generateSearchBar (){
    html = 
    `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `
    searchBar.insertAdjacentHTML('beforeend', html);
}

// Create Search Name function. 
// create empty array called searchList. If input matches any letter from the first or last name field of the 12 generated users, push the user into the searchList array.
// generate new HTML using new searchList array.

function searchName(input,usersData){
    let searchList = [];
    // create a for loop to go through the list to find user based on first or last name
    for (i = 0; i < usersData.length; i++){
    // create a conditional statement to check if the input includes any first name or last name. Reminder to change to lower case.      
       if( usersData[i].name.first.toLowerCase().includes(input.value.toLowerCase()) || usersData[i].name.last.toLowerCase().includes(input.value.toLowerCase()) ){
    // if it matches, push it into the searchList array.
          searchList.push(usersData[i]);
       }
    }
    if(searchList.length >= 1){
        generateEmployeeData(searchList);
        generateModal(searchList);
    } else {
        gallery.innerHTML = `<h2>No Results found.</h2>`;
    }

}

// ---------------------------------
// EVENT LISTENERS
// ---------------------------------

// When user click on the card, modal pops up
// if the card s/n gets click, the corresponding modal will get pop.
// Error faced when clicking background.


gallery.addEventListener('click', (e) => {
    // if statement to prevent error when clicking empty spaces on background.
    if(e.target.className !== 'gallery'){
        let card = e.target.closest('.card');
        let cardIndex = card.getAttribute('data-index');
        singleModal[cardIndex].style.display = '';
        modals.style.display = '';
    }
})


// Make sure there’s a way to close the modal window 
// when users click X or click outside the modal.

modals.addEventListener('click', (e) => {
    if(e.target.className === 'modal-close-btn'  ||  e.target.textContent === 'X' || e.target.className === 'modal-container'){
        modals.style.display = 'none'
        for (let i = 0; i <singleModal.length; i++){
            singleModal[i].style.display = 'none';
        }
    }
})

// When user click next or previous button within modal, it will show either the previous and next modal correspondingly.
// When user conducts search, the next and prev selection should only work for selected people.

modals.addEventListener('click', (e) => {
    const currentModal = e.target.closest('.modal'); 

    if (e.target.textContent === 'Prev') {
        const prevModal = currentModal.previousElementSibling;
        currentModal.style.display = 'none';
        prevModal.style.display = '';
     } else if (e.target.textContent === 'Next') {
        const nextModal = currentModal.nextElementSibling;
        currentModal.style.display = 'none';
        nextModal.style.display = '';
     }

})

// When user searches for name, run searchName function. If user has no input, default state to show 12 generated users.

searchBar.addEventListener('keyup', (e) => {
    let input = e.target;
    if (input.value.length !== 0) {
        searchName(input, usersData);
    } else {
        generateEmployeeData(usersData)
        generateModal(usersData)
    }
})

// When user searches for name, run searchName function. If user has no input, default state to show 12 generated users.

searchBar.addEventListener('submit', (e) => {
    let input = e.target.firstElementChild;
    searchName(input, usersData);

})





























