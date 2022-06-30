

// Global Declarations

const userDataURL = 'https://randomuser.me/api/?results=12&inc=name,picture,email,location&nat=us';
const gallery = document.getElementById('gallery');
const searchBar = document.getElementsByClassName('search-container');


// ---------------------------------
// FETCH FUNCTIONS
// ---------------------------------
fetch(userDataURL)
    .then( response => checkStatus(response) )
    .then( response => response.json() )
    .then( data => generateEmployeeData(data.results) )

    .catch( error => console.log (error) )

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
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${users[i].picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${users[i].name.first} ${users[i].name.first}</h3>
                <p class="card-text">${users[i].email}</p>
                <p class="card-text cap">${users[i].location.city} ${users[i].name.first}</p>
            </div>
        </div>
        `
        gallery.insertAdjacentHTML('beforeend', html);
    }
}

// Create modal
//When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
    // Image
    // Name
    // Email
    // City or location
    // Cell Number
    // Detailed Address, including street name and number, state or country, and post code.
    // Birthday
    // Make sure there’s a way to close the modal window
    // Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.
    // NOTE: The formatting of the Cell Number should be (XXX) XXX-XXXX and the formatting of the Birthday should be MM/DD/YYYY.







