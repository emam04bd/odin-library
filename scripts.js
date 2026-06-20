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
	// id, title, author, nop, status
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
	const bookInfoEls = document.querySelectorAll(".book-info");

	// improvement needed
	const title = bookInfoEls[0].value;
	const author = bookInfoEls[1].value;
	const noOfPages = bookInfoEls[2].value;
	const status = bookInfoEls[3].value;

	const newBook = new Book(title, author, noOfPages, status);
	for (let key in newBook) {
		if (newBook[key] == "") {
			console.log(`${key} is empty`);
			return;
		}
	}

	bookInfoEls.forEach((el) => {
		el.value = "";
	});

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
		displayAddedBook(newBook);
	}
}

const addBtnEl = document.querySelector("#add-btn");
addBtnEl.addEventListener("click", addNewBook);

const asideEl = document.querySelector("aside");
const newBookBtnEl = document.querySelector("#new-book-btn");
const closeBtnEl = document.querySelector("#close-btn");
newBookBtnEl.addEventListener("click", () => {
	asideEl.classList.remove("hide");
});
closeBtnEl.addEventListener("click", () => {
	asideEl.classList.add("hide");
});
