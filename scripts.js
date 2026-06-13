const booksTableEl = document.querySelector(".books-table");

function Book(title, author, noOfPages, status) {
	if (!new.target) {
		throw Error(`Didn't use 'new' operator!`);
	}
	this.id = self.crypto.randomUUID;
	this.title = title;
	this.author = author;
	this.noOfPages = noOfPages;
	this.status = status;
}

// Book.prototype.change_status = function () {
// 	// TODO
// };

const library = [
	// Demo data
	{
		id: 1,
		title: "Book1",
		author: "Author1",
		noOfPages: 234,
		status: "completed",
	},
	{
		id: 2,
		title: "Book2",
		author: "Author2",
		noOfPages: 234,
		status: "reading",
	},
	{
		id: 3,
		title: "Book3",
		author: "Author3",
		noOfPages: 234,
		status: "not started",
	},
];

function displayRow(book, idx) {
	const tableRowEl = document.createElement("tr");
	tableRowEl.classList.add("book-row");
	booksTableEl.appendChild(tableRowEl);

	for (let key in book) {
		const tableDataEl = document.createElement("td");
		tableDataEl.classList.add(`book-${key}`);
		tableDataEl.innerText = key == "id" ? idx : book[key];
		tableRowEl.appendChild(tableDataEl);
	}
}

function displayAvailableBooks() {
	if (library.length == 0) {
		// TODO: show a message saying the library is empty.
		return;
	}
	library.forEach((book, idx) => {
		displayRow(book, idx + 1);
	});
}

displayAvailableBooks();

function getNewBook() {
	const title = prompt("Title:");
	const author = prompt("Author:");
	const noOfPages = prompt("No of pages:");
	const status = prompt("Status:");

	const newBook = new Book(title, author, noOfPages, status);
	for (let key in newBook) {
		if (newBook[key] == "") {
			console.log(`${key} is empty`);
			return;
		}
	}
	return newBook;
}

function displayAddedBook(book) {
	const idx = library.length;
	displayRow(book, idx);
}

function addNewBook() {
	const newBook = getNewBook();
	if (newBook) {
		library.push(newBook);
		alert("The book is added to the library");
		displayAddedBook(newBook);
	}
}
