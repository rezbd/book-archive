
const searchInput = document.getElementById('search-input');
const errorContainer = document.getElementById('error-container');
const bookContainer = document.getElementById('book-container');

const searchButton = () => {
    const search = searchInput.value;
    if (search === "") {
        errorContainer.innerHTML = `<p>No result found</p>`
        return;
    }
    // clear previous search
    bookContainer.innerHTML = "";
    // search API
    const url = `http://openlibrary.org/search.json?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .finally(searchInput.value = "")
}

