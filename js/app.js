
const searchInput = document.getElementById('search-input');
const errorContainer = document.getElementById('error-container');
const bookContainer = document.getElementById('book-container');
const searchNumber = document.getElementById('search-number');

const searchButton = () => {
    const search = searchInput.value;
    if (search === "") {
        errorContainer.innerHTML = `<p>No result found</p>`
        return;
    }
    // clear previous search
    bookContainer.innerHTML = "";
    errorContainer.innerHTML = "";
    // search API
    const url = `http://openlibrary.org/search.json?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data))
        .finally(searchInput.value = "")
}

const displaySearch = (booksArray) => {
    // number of search results
    searchNumber.innerHTML = `
        <p class="text-center">Showing ${booksArray.docs.splice(0, 6).length} of ${booksArray.numFound} results</p>
    `

    // error handling
    if (booksArray.numFound === 0) {
        errorContainer.innerHTML = `<p class="text-center">NO RESULT FOUND</p>`
    } else {
        errorContainer.innerHTML = "";
    }

    // array loop
    booksArray.docs.splice(0, 6).forEach(book => {
        console.log(book)
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.key.cover_i}-L.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <p>Book Name: <span class="fs-5">${book.title}</span></p>
                    <p>Author: <span class="fs-6">${book.author_name[0]}</span></p>
                </div>
            </div>
        `
        bookContainer.appendChild(div);
    })
}

