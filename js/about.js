const aboutContainer = document.querySelector(".about-container");

const url = "http://localhost/project-exam/wp-json/wp/v2/posts/?id=93";

async function fetchData() {

    try {
        const response = await fetch(url);
        const results = await response.json();
    
        aboutContainer.innerHTML = "";

        const aboutInfo = results;
        console.log(aboutInfo);

        aboutInfo.forEach(function(about) {
            aboutContainer.innerHTML += 
            `<div class="container">
                <h1 class="title"> lolmao </h1>
                ${about}
            </div>`
        });
    }
    catch(error) {
        console.log(error);
        aboutContainer.innerHTML += `<div class="container">Sorry there was an issue loading in the about page, let us know through the contact form and we'll get to it asap!</div>`;
    }
}
fetchData();