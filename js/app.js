

// Global Declarations

const userDataURL = 'https://randomuser.me/api/?results=12&inc=name,picture,email,phone,dob,location&nat=us';
const gallery = document.getElementById('gallery');
const searchBar = document.querySelector('.search-container');

const modals = document.createElement('div');
modals.classList.add('modal-container');
modals.style.display = 'none'
const singleModal = document.getElementsByClassName("modal");
const nameList = document.getElementsByClassName('modal-name');




// ---------------------------------
// FETCH FUNCTIONS
// ---------------------------------
fetch(userDataURL)
    .then( checkStatus )
    .then( response => response.json() )
    .then( data => {
        console.log(data.results);
        generateEmployeeData(data.results);
        generateModal(data.results)
        generateSearchBar()
    })
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
    for (let i = 0; i < users.length; i++){
        
        const date = new Date (users[i].dob.date);
        let html = 
            `
            <div class="modal" data-index="${[i]}">
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

    firstPrevBtn.style.display = 'none';
    lastNextBtn.style.display = 'none';

}


// Search Bar
// need to create search from API

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

function searchName(input,nameList){
    let searchList = [];
 // create a for loop to go through the list to find student based on first or last name
    for (i = 0; i < nameList.length; i++){
 // create a conditional statement to check if the input includes any first name or last name. Reminder to change to lower case.      
       if(nameList[i].textContent.toLowerCase().includes(input.value.toLowerCase()) || nameList[i].textContent.toLowerCase().includes(input.value.toLowerCase()) ){
 // if it matches, push it into the searchList array.
          searchList.push(nameList[i]);

       }
    }
}

// ---------------------------------
// EVENT LISTENERS
// ---------------------------------

// When user click on the card, modal pops up
// if the card s/n gets click, the corresponding modal will get pop.


gallery.addEventListener('click', (e) => {
    let card = e.target.closest('.card');
    let index = card.getAttribute('data-index');
    singleModal[index].style.display = '';
    modals.style.display = '';

})


// Make sure there’s a way to close the modal window 
// when users click X or click outside the modal.

modals.addEventListener('click', (e) => {
 
    if(e.target.textContent === 'X' || e.target.className === 'modal-container'){
        modals.style.display = 'none'
        for (let i = 0; i <singleModal.length; i++){
            singleModal[i].style.display = 'none';
        }
    }
})

// When user click next or previous button within modal, it will show either the previous and next modal correspondingly.

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

// When user searches for name, show matched names

searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.textContent)
})