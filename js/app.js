

// Global Declarations

const userDataURL = 'https://randomuser.me/api/?results=12&inc=name,picture,email,phone,dob,location&nat=us';
const gallery = document.getElementById('gallery');
const searchBar = document.getElementsByClassName('search-container');

const modals = document.createElement('div');
modals.classList.add('modal-container');
modals.style.display = 'none'
const singleModal = document.getElementsByClassName("modal");



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
    
    // Disable 'Prev' Button for First Modal and 'Next' Button for Last Modal
    const firstPrevBtn = document.getElementsByClassName('modal-prev')[0]
    const lastNextBtn = document.getElementsByClassName('modal-next')[singleModal.length - 1]

    firstPrevBtn.disabled = true;
    firstPrevBtn.classList.add('disabled');
    lastNextBtn.disabled = true;
    lastNextBtn.classList.add('disabled');

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

// When user click next or previous button within modal.

modals.addEventListener('click', (e) => {
    currentIndex = e.target.closest('.modal').getAttribute('data-index') // error after clicking outside of modal
    nextIndex = parseInt(currentIndex) + 1;
    prevIndex = parseInt(currentIndex) - 1;

    if (e.target.textContent === 'Prev' && prevIndex >= 0){
        singleModal[currentIndex].style.display = 'none';
        singleModal[prevIndex].style.display = '';
     } else if (e.target.textContent === 'Next' && nextIndex <= 11){
         singleModal[currentIndex].style.display = 'none';
         singleModal[nextIndex].style.display = '';
     }

})


// need to create search from API






