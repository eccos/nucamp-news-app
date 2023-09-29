
const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const newsDiv = document.querySelector("#news");
const catFilters = document.querySelector("#category-filter ul").children;

for (const catFilter of catFilters) {
    catFilter.children[0].onclick = (e) => {
        const cat = e.currentTarget.textContent;
        clearChildrenOf(newsDiv);
        const h2 = document.createElement("h2");
        h2.textContent = cat + " news";
        newsDiv.appendChild(h2);
        fetchNews(cat);
    }
}

function clearChildrenOf(node) {
    while (node.firstChild) {
        node.firstChild.remove();
    }
}

async function fetchNews(category) {
    const cat = (category) ? `&category=${category}` : "";
    try {
        const resp = await fetch(url + cat);
        const json = await resp.json();
        console.log(json);
        displayNews(json.articles);
    } catch (error) {
        console.error(error);
    }
}

function displayNews(articles) {
    articles.forEach(article => {
        const { author, description, title, url, urlToImage } = article;
        const card = createCard(article);
        newsDiv.appendChild(card);
    });
}

function createCard({ author, description, title, url, urlToImage }) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${urlToImage}" class="card-img-top" alt="news article">
    `;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.innerHTML = `
      <h5 class="card-title">
        <a href="${url}" class="card-link">${title}</a>
      </h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${author}</h6>
      <p class="card-text">${description}</p>
    `;

    card.appendChild(cardBody);
    return card;
}
