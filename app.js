const accessKey = "6E4-VT8rkTrag3s9n7g8Zm8jdLRZ_3tChm6SfpotE_c";
const formEl = document.querySelector(".form");
const searchInputEl = document.querySelector("input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResultsEl.innerHTML = "";
        }

        const results = data.results;

        results.forEach((result) => {
            // Create the container div
            const resultWrapper = document.createElement('div');
            resultWrapper.classList.add('search-result');
            
            // Create and setup the image
            const img = document.createElement('img');
            img.src = result.urls.small;
            img.alt = result.alt_description;
            
            // Create and setup the anchor
            const link = document.createElement('a');
            link.href = result.links.html;
            link.target = "_blank";
            link.textContent = result.alt_description;

            // Assemble the elements
            resultWrapper.appendChild(img);
            resultWrapper.appendChild(link);
            searchResultsEl.appendChild(resultWrapper);
        });

        // Show the "Show More" button if there are results
        if (results.length > 0) {
            showMoreButtonEl.style.display = "block";
        } else {
            showMoreButtonEl.style.display = "none";
            if (page === 1) {
                searchResultsEl.innerHTML = "<p class='no-results'>No images found. Try a different search term.</p>";
            }
        }

    } catch (error) {
        console.error("Error fetching images:", error);
        searchResultsEl.innerHTML = "<p class='error'>An error occurred while fetching images. Please try again later.</p>";
        showMoreButtonEl.style.display = "none";
    }
}

// Form submission event
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

// Show more button event
showMoreButtonEl.addEventListener("click", () => {
    page++;
    searchImages();
});