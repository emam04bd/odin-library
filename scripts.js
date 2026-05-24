const bookNameEl = document.querySelector("#book-name");
const bookAuthorEl = document.querySelector("#book-author");
const addBtnEl = document.querySelector("#add-btn");
const booksTableEl = document.querySelector(".books-table");

const library = [
	{ name: "Book1", author: "Author1" },
	{ name: "Book2", author: "Author2" },
	{ name: "Book3", author: "Author3" },
];

function displayBooks() {
	library.forEach((book, idx) => {
		const tableRowEl = document.createElement("tr");
		tableRowEl.classList.add("book-row");
		booksTableEl.appendChild(tableRowEl);
		const tableIdxEl = document.createElement("td");
		tableIdxEl.classList.add("book-idx");
		tableIdxEl.innerText = idx + 1;
		tableRowEl.appendChild(tableIdxEl);
		const tableNameEl = document.createElement("td");
		tableNameEl.classList.add("book-name");
		tableNameEl.innerText = book.name;
		tableRowEl.appendChild(tableNameEl);
		const tableAuthorEl = document.createElement("td");
		tableAuthorEl.classList.add("book-author");
		tableAuthorEl.innerText = book.author;
		tableRowEl.appendChild(tableAuthorEl);
	});
}

displayBooks();

function Book(name, author) {
	if (!new.target) {
		throw Error(`Didn't use 'new' operator!`);
	}
	this.id = self.crypto.randomUUID;
	this.name = name;
	this.author = author;
}

function addBookToLibrary() {
	const name = bookNameEl.value;
	const author = bookAuthorEl.value;

	if (name == "") {
		alert("Book name required");
		return;
	} else if (author == "") {
		alert("Author name required");
		return;
	}
	const newBook = new Book(name, author);
	library.push(newBook);
	alert("The book is added to the library");
}

addBtnEl.addEventListener("click", addBookToLibrary);
