const API_KEY = "bd11ff34c8c947de915852e205cf2498";  // Replace with your actual API key if using API
const url = "https://newsapi.org/v2/everything?q=";  // URL for fetching news
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// Sample static data for 13 districts in Uttarakhand (replace with real API data later)
const newsData = {
    Almora: [
        { title: "Almora News 1", desc: "Latest news from Almora", img: "https://via.placeholder.com/400x200", source: "Source 1", date: "10/10/2024" },
        { title: "Almora News 2", desc: "Breaking news in Almora", img: "https://via.placeholder.com/400x200", source: "Source 2", date: "11/10/2024" }
    ],
    Dehradun: [
        { title: "Dehradun News 1", desc: "Latest news from Dehradun", img: "https://via.placeholder.com/400x200", source: "Source 3", date: "12/10/2024" },
        { title: "Dehradun News 2", desc: "Breaking news in Dehradun", img: "https://via.placeholder.com/400x200", source: "Source 4", date: "13/10/2024" }
    ],
    Nainital: [
        { title: "Nainital News 1", desc: "Latest news from Nainital", img: "https://via.placeholder.com/400x200", source: "Source 5", date: "14/10/2024" },
        { title: "Nainital News 2", desc: "Breaking news in Nainital", img: "https://via.placeholder.com/400x200", source: "Source 6", date: "15/10/2024" }
    ],
    Pithoragarh: [
        { title: "Pithoragarh News 1", desc: "Latest news from Pithoragarh", img: "https://via.placeholder.com/400x200", source: "Source 7", date: "16/10/2024" },
        { title: "Pithoragarh News 2", desc: "Breaking news in Pithoragarh", img: "https://via.placeholder.com/400x200", source: "Source 8", date: "17/10/2024" }
    ],
    Champawat: [
        { title: "Champawat News 1", desc: "Latest news from Champawat", img: "https://via.placeholder.com/400x200", source: "Source 9", date: "18/10/2024" },
        { title: "Champawat News 2", desc: "Breaking news in Champawat", img: "https://via.placeholder.com/400x200", source: "Source 10", date: "19/10/2024" }
    ],
    Tehri: [
        { title: "Tehri News 1", desc: "Latest news from Tehri", img: "https://via.placeholder.com/400x200", source: "Source 11", date: "20/10/2024" },
        { title: "Tehri News 2", desc: "Breaking news in Tehri", img: "https://via.placeholder.com/400x200", source: "Source 12", date: "21/10/2024" }
    ],
    Uttarkashi: [
        { title: "Uttarkashi News 1", desc: "Latest news from Uttarkashi", img: "https://via.placeholder.com/400x200", source: "Source 13", date: "22/10/2024" },
        { title: "Uttarkashi News 2", desc: "Breaking news in Uttarkashi", img: "https://via.placeholder.com/400x200", source: "Source 14", date: "23/10/2024" }
    ],
    Rudraprayag: [
        { title: "Rudraprayag News 1", desc: "Latest news from Rudraprayag", img: "https://via.placeholder.com/400x200", source: "Source 15", date: "24/10/2024" },
        { title: "Rudraprayag News 2", desc: "Breaking news in Rudraprayag", img: "https://via.placeholder.com/400x200", source: "Source 16", date: "25/10/2024" }
    ],
    Pauri: [
        { title: "Pauri News 1", desc: "Latest news from Pauri", img: "https://via.placeholder.com/400x200", source: "Source 17", date: "26/10/2024" },
        { title: "Pauri News 2", desc: "Breaking news in Pauri", img: "https://via.placeholder.com/400x200", source: "Source 18", date: "27/10/2024" }
    ],
    Haridwar: [
        { title: "Haridwar News 1", desc: "Latest news from Haridwar", img: "https://via.placeholder.com/400x200", source: "Source 19", date: "28/10/2024" },
        { title: "Haridwar News 2", desc: "Breaking news in Haridwar", img: "https://via.placeholder.com/400x200", source: "Source 20", date: "29/10/2024" }
    ],
    Bageshwar: [
        { title: "Bageshwar News 1", desc: "Latest news from Bageshwar", img: "https://via.placeholder.com/400x200", source: "Source 21", date: "30/10/2024" },
        { title: "Bageshwar News 2", desc: "Breaking news in Bageshwar", img: "https://via.placeholder.com/400x200", source: "Source 22", date: "31/10/2024" }
    ],
    UdhamSinghNagar: [
        { title: "Udham Singh Nagar News 1", desc: "Latest news from Udham Singh Nagar", img: "https://via.placeholder.com/400x200", source: "Source 23", date: "01/11/2024" },
        { title: "Udham Singh Nagar News 2", desc: "Breaking news in Udham Singh Nagar", img: "https://via.placeholder.com/400x200", source: "Source 24", date: "02/11/2024" }
    ],
};

// Function to toggle the visibility of the district container
function toggleDistricts() {
    var districtContainer = document.getElementById('district-container');
    districtContainer.style.display = districtContainer.style.display === 'none' ? 'block' : 'none';
}

// Function to display news specific to a district
function showDistrictNews(district) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';  // Clear current news cards

    const districtNews = newsData[district] || [];  // Get district news from the dataset
    const template = document.getElementById('template-news-card');  // News card template

    districtNews.forEach(news => {
        const clone = template.content.cloneNode(true);  // Clone the template
        clone.getElementById('news-title').textContent = news.title;
        clone.getElementById('news-desc').textContent = news.desc;
        clone.getElementById('news-img').src = news.img;
        clone.getElementById('news-source').textContent = `${news.source} ${news.date}`;
        cardsContainer.appendChild(clone);  // Add the card to the container
    });
}

// Fetch default news on page load
window.addEventListener("load", () => {
    fetchNews("India");
    document.body.classList.add("loading");
    setTimeout(() => {
        document.body.classList.remove("loading");
        document.getElementById("loading-overlay").style.display = "none";
    }, 800);  // Adjust timing as needed
});

// Function to fetch news from API
async function fetchNews(query) {
    const loadingSpinner = document.getElementById("loading");
    loadingSpinner.style.display = "block";  // Show spinner
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) throw new Error("API response not OK");
        const data = await res.json();
        bindData(data.articles);  // Bind API data to cards
    } catch (error) {
        console.error("Error fetching news:", error);
    }
    loadingSpinner.style.display = "none";  // Hide spinner
}

// Bind data to news cards
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";  // Clear existing cards

    articles.forEach((article, index) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);

        cardClone.firstElementChild.style.animationDelay = `${index * 0.1}s`;
        cardsContainer.appendChild(cardClone);
    });
}

// Fill data in card
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

// Handle navigation clicks
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// Search functionality
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

// Subscribe to newsletter
const subscribeButton = document.getElementById("subscribe-button");

subscribeButton.addEventListener("click", () => {
    const emailInput = document.getElementById("newsletter-email").value;

    if (emailInput) {
        alert(`Thank you for subscribing with ${emailInput}!`);
        document.getElementById("newsletter-email").value = "";  // Clear the input field
    } else {
        alert("Please enter a valid email address.");
    }
});

// Comment submission
const commentsList = document.getElementById("comments-list");
const commentInput = document.getElementById("comment-input");
const submitCommentButton = document.getElementById("submit-comment");

submitCommentButton.addEventListener("click", () => {
    const commentText = commentInput.value;
    if (commentText) {
        const commentDiv = document.createElement("div");
        commentDiv.textContent = commentText;
        commentsList.appendChild(commentDiv);
        commentInput.value = "";  // Clear input after submission
    }
});

