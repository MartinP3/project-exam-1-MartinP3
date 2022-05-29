const baseUrl = "https://koyanskaya.com/wp-json/wp/v2/posts?categories=7";

const blogContainer = document.querySelector(".blogs-container");
const morePosts = document.querySelector(".more-posts")

async function addAllBlogs(url) {

    // Fetching the first 10 posts.

    try {
        const response = await fetch(url)
        const posts = await response.json()
        console.log(posts);

        blogContainer.innerHTML = "";

        // Displaying post details
    
        posts.forEach((post) => {
            blogContainer.innerHTML += `
            <div class="blog-cards">
                <a href="blogpage.html?id=${post.id}">
                <img src="${post.better_featured_image.source_url}" alt="${post.better_featured_image.alt_text}">
                <h2 class="food-name">${post.title.rendered}</h2>
            </a></div>`
        });
    } catch (error) {
        blogContainer.innerHTML += `<div class="container">Sorry there was an issue loading in the blog list page, let us know through the contact form and we'll get to it asap!</div>`;
    }
}
addAllBlogs(baseUrl)

// Fetching the rest of the posts (up to next 10) when clicking button and hiding the button since for now that's the upper limit of posts.

morePosts.onclick = function() {
    const newUrl = baseUrl + "&per_page=20";
    morePosts.style.display = "none";
    blogContainer.innerHTML = "";
    addAllBlogs(newUrl);
}
