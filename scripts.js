const bookNameEl = document.querySelector("#book-name");
const bookAuthorEl = document.querySelector("#book-author");
const addBtnEl = document.querySelector("#add-btn");
const booksTableEl = document.querySelector(".books-table");

const library = [];

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
