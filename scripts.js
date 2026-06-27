const booksTableEl = document.querySelector(".books-table");
const bookDetails = ["id", "title", "author", "noOfPages", "status"];

function Book(title, author, noOfPages, status) {
	if (!new.target) {
		throw Error(`Didn't use 'new' operator!`);
	}
	this.id = self.crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.noOfPages = noOfPages;
	this.status = status;
}

// TODO: handle this situation
Book.prototype.change_status = function (newStatus) {
	this.status = newStatus;
};

const library = [
	// Demo data
	// id, title, author, nop, status
	{
		id: 1,
		title: "Book1",
		author: "Author1",
		noOfPages: 234,
		status: "read",
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
		status: "reading",
	},
];

function displayRow(book) {
	const tableRowEl = document.createElement("tr");
	tableRowEl.classList.add("book-row");
	booksTableEl.appendChild(tableRowEl);

	for (let x of bookDetails) {
		const tableDataEl = document.createElement("td");
		tableDataEl.dataset.id = book.id;
		tableDataEl.classList.add(`book-${x}`);
		tableDataEl.innerText = book[x];
		tableRowEl.appendChild(tableDataEl);
	}

	const deleteBtnEl = document.createElement("button");
	deleteBtnEl.type = "button";
	deleteBtnEl.innerText = "delete";
	deleteBtnEl.dataset.id = book.id;
	deleteBtnEl.classList.add("delete-book");
	tableRowEl.appendChild(deleteBtnEl);
	deleteBtnEl.addEventListener("click", function () {
		const id = this.dataset.id;
		const elements = document.querySelectorAll(`[data-id="${id}"]`);
		elements.forEach((element) => {
			element.remove();
		});
		const library_idx = library.findIndex((ele) => ele.id == id);
		console.log(library_idx);
		library.splice(library_idx, 1);
	});
}

function displayAvailableBooks() {
	if (library.length == 0) {
		// TODO: show a message saying the library is empty.
		return;
	}
	library.forEach((book) => {
		displayRow(book);
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

function addNewBook() {
	const newBook = getNewBook();
	if (newBook) {
		library.push(newBook);
		displayRow(newBook);
	}
}

// Add button click
const addBtnEl = document.querySelector("#add-btn");
addBtnEl.addEventListener("click", addNewBook);

// Show and hide sidebar
const asideEl = document.querySelector("aside");
const newBookBtnEl = document.querySelector("#new-book-btn");
const closeBtnEl = document.querySelector("#close-btn");
newBookBtnEl.addEventListener("click", () => {
	asideEl.classList.remove("hide");
});
closeBtnEl.addEventListener("click", () => {
	asideEl.classList.add("hide");
});
