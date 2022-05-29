const newTitle = document.querySelector("title")
const blogInfo = document.querySelector(".blogs-page")

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const baseUrl = `https://koyanskaya.com/wp-json/wp/v2/posts/${id}`;

// adding the modal div
const modal = document.createElement("div");
modal.id = "modal";
document.body.appendChild(modal);

// Fetching the post specifics

async function fetchBlogPost() {

    try {
        const response = await fetch(baseUrl);
        const post = await response.json();

        console.log(post);

        blogInfo.innerHTML += `
        <div class="container">
            <img class="blog-image" src="${post.better_featured_image.source_url} " alt="${post.better_featured_image.alt_text}">
            <h1>${post.title.rendered}</h1>
            <div>${post.content.rendered}</div>
        </div>`
      newTitle.innerHTML = `Martin's Kitchen | ${post.title.rendered}`;
      
      // modal image opening and closing
        const images = document.querySelector(".blog-image");
        images.addEventListener("click", (e) => {
          modal.classList.add("modal-active");
        const openImg = document.createElement("img");
        openImg.classList.add("opened-img");
        openImg.src = images.src;
        while (modal.firstChild) {
          modal.removeChild(modal.firstChild);
        }
        modal.appendChild(openImg);
        });

        modal.addEventListener("click", (e) => {
          if (e.target !== e.currentTarget)
          return;
          modal.classList.remove("modal-active");
        });
      
    } catch (error) {
        blogInfo.innerHTML += `An error has occured, please return to main page or contact us`;
    }
}
fetchBlogPost();
