const bookTitleEl = document.querySelector("#book-title");
const bookAuthorEl = document.querySelector("#book-author");
const addBtnEl = document.querySelector("#add-btn");
const booksTableEl = document.querySelector(".books-table");

const library = [
	{ id: 1, title: "Book1", author: "Author1", noOfPages: 234 },
	{ id: 2, title: "Book2", author: "Author2", noOfPages: 234 },
	{ id: 3, title: "Book3", author: "Author3", noOfPages: 234 },
];

function displayBooks() {
	if (library.length == 0) {
		// TODO: show a message saying the library is empty.
		return;
	}
	library.forEach((book, idx) => {
		const tableRowEl = document.createElement("tr");
		tableRowEl.classList.add("book-row");
		booksTableEl.appendChild(tableRowEl);

		for (let key in book) {
			const tableDataEl = document.createElement("td");
			tableDataEl.classList.add(`book-${key}`);
			tableDataEl.innerText = key == "id" ? idx + 1 : book[key];
			tableRowEl.appendChild(tableDataEl);
		}
	});
}

displayBooks();

function Book(title, author, noOfPages, read_status) {
	if (!new.target) {
		throw Error(`Didn't use 'new' operator!`);
	}
	this.id = self.crypto.randomUUID;
	this.title = title;
	this.author = author;
	this.noOfPages = noOfPages;
	this.read_status = read_status;
}

function addBookToLibrary() {
	const title = bookTitleEl.value;
	const author = bookAuthorEl.value;

	if (title == "") {
		alert("Book title required");
		return;
	} else if (author == "") {
		alert("Author title required");
		return;
	}
	const newBook = new Book(title, author);
	library.push(newBook);
	alert("The book is added to the library");
	return newBook;
}

function displayAddedBook(book) {
	const idx = document.querySelectorAll(".book-row").length;
	const tableRowEl = document.createElement("tr");
	tableRowEl.classList.add("book-row");
	booksTableEl.appendChild(tableRowEl);
	const tableIdxEl = document.createElement("td");
	tableIdxEl.classList.add("book-idx");
	tableIdxEl.innerText = idx + 1;
	tableRowEl.appendChild(tableIdxEl);
	const tableTitleEl = document.createElement("td");
	tableTitleEl.classList.add("book-title");
	tableTitleEl.innerText = book.title;
	tableRowEl.appendChild(tableTitleEl);
	const tableAuthorEl = document.createElement("td");
	tableAuthorEl.classList.add("book-author");
	tableAuthorEl.innerText = book.author;
	tableRowEl.appendChild(tableAuthorEl);
}

addBtnEl.addEventListener("click", () => {
	const newBook = addBookToLibrary();
	if (newBook) {
		displayAddedBook(newBook);
	}
});
