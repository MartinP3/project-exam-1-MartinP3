const baseUrl = "https://koyanskaya.com//wp-json/wp/v2";

const routes = {
  posts: "/posts",
  media: "/media",
  categories: "/categories",
  tags: "/tags",
}

async function fetchApi (url){
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const aboutContainer = document.querySelector(".about-container")

async function addAboutContent() {
  try{ // fetching the about me post so it can be updated directly whenever.
    const aboutInfo = await fetchApi(baseUrl + routes.posts + "/93");
    console.log(aboutInfo);
      aboutContainer.innerHTML += `
        <div class="container">
            <img class="about-image" src="${aboutInfo.better_featured_image.source_url}"
            alt="${aboutInfo.better_featured_image.alt_text}">
        </div>
        <div class="container">
        <h1>About me</h1>
        ${aboutInfo.content.rendered}
        </div>`;
  
  } catch (error) {
    console.log(error);
    aboutContainer.innerHTML += `<div class="container">Sorry there was an issue loading in the about page, let us know through the contact form and we'll get to it asap!</div>`;
  }
}
addAboutContent();