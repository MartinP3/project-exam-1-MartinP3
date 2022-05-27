const newTitle = document.querySelector("title")
const blogInfo = document.querySelector(".blogs-page")

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const baseUrl = `https://koyanskaya.com/wp-json/wp/v2/posts/${id}`;

console.log(baseUrl)

// Fetching the post specifics

async function fetchBlogPost() {

    try {
        const response = await fetch(baseUrl);
        const post = await response.json();

        console.log(post);

        blogInfo.innerHTML += `
        <div class="container">
            <img src="${post.better_featured_image.source_url} " alt="${post.better_featured_image.alt_text}">
            <h1>${post.title.rendered}</h1>
            <div>${post.content.rendered}</div>
        </div>`

        newTitle.innerHTML = `Martin's kitchen | ${post.title.rendered}`;

    } catch (error) {
        blogInfo.innerHTML += `An error has occured, please return to main page or contact us`;
    }
}
fetchBlogPost();