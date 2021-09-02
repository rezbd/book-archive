const searchInput = document.getElementById('search-input');
const errorContainer = document.getElementById('error-container');
const bookContainer = document.getElementById('book-container');
const searchNumber = document.getElementById('search-number');

const searchButton = () => {
    const search = searchInput.value;
    // clear previous search
    bookContainer.innerHTML = "";
    errorContainer.innerHTML = "";
    searchNumber.innerHTML = "";
    // search API
    const url = `https://openlibrary.org/search.json?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data))
        .finally(searchInput.value = "")
}

const displaySearch = (booksArray) => {
    // number of search results
    searchNumber.innerHTML = `
        <p class="text-center fs-5">Showing <span class="fw-bold">${booksArray.docs.slice(0, 12).length}</span> of <span class="fw-bold">${booksArray.numFound}</span> search results</p>
    `

    // error handling
    if (booksArray.numFound === 0) {
        errorContainer.innerHTML = `<p class="text-center text-danger fs-5">NO RESULT FOUND</p>`
    }
    else {
        errorContainer.innerHTML = "";
    }

    // array loop
    booksArray.docs.slice(0, 12).forEach(book => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" style="height: 210px; width: auto" class="card-img-top mx-auto mt-2" alt="...">
                <div class="card-body">
                    <p>Book Name: <span class="fs-5 fw-bold">${book.title}</span></p>
                    <p>Author: <span class="fs-6 fst-italic">${book.author_name ? book.author_name[0] : ''}</span></p>
                    <p>Publisher: <span class="fs-6">${book.publisher ? book.publisher[0] : ''}</span></p>
                    <p>First Publish Year: <span class="fs-6">${book.first_publish_year}</span></p>
                </div>
            </div>
        `
        bookContainer.appendChild(div);
    })
}

