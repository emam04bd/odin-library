const booksTableEl = document.querySelector(".books-table");

class Book {
	constructor(title, author, noOfPages, status) {
		this.id = self.crypto.randomUUID();
		this.title = title;
		this.author = author;
		this.noOfPages = noOfPages;
		this.status = status;
	}
}

Book.prototype.changeStatus = function (newStatus) {
	this.status = newStatus;
};

const book1 = new Book("Book1", "Author1", 123, "read");
const book2 = new Book("Book2", "Author2", 234, "unread");
const book3 = new Book("Book3", "Author3", 345, "read");

const library = [book1, book2, book3];

function displayRow(book) {
	const tableRowEl = document.createElement("tr");
	tableRowEl.classList.add("book-row");
	booksTableEl.appendChild(tableRowEl);
	const bookDetails = ["title", "author", "noOfPages"];

	for (let x of bookDetails) {
		const tableDataEl = document.createElement("td");
		tableDataEl.dataset.id = book.id;
		tableDataEl.classList.add(`book-${x}`);
		tableDataEl.innerText = book[x];
		tableRowEl.appendChild(tableDataEl);
	}

	const changeStatusBtn = document.createElement("button");
	changeStatusBtn.type = "button";
	changeStatusBtn.innerText = book.status;
	changeStatusBtn.dataset.id = book.id;
	tableRowEl.appendChild(changeStatusBtn);
	changeStatusBtn.addEventListener("click", function () {
		const currentStatus = book.status;
		let newStatus = undefined;
		if (currentStatus == "read") {
			newStatus = "unread";
		} else if (currentStatus == "unread") {
			newStatus = "read";
		}
		library.forEach((ele) => {
			if (book.id == ele.id) {
				ele.changeStatus(newStatus);
			}
		});
		this.innerText = newStatus;
	});

	const deleteBtnEl = document.createElement("button");
	deleteBtnEl.type = "button";
	deleteBtnEl.innerText = "delete";
	deleteBtnEl.dataset.id = book.id;
	tableRowEl.appendChild(deleteBtnEl);
	deleteBtnEl.addEventListener("click", () => {
		const id = book.id;
		const elements = document.querySelectorAll(`[data-id="${id}"]`);
		elements.forEach((element) => {
			element.remove();
		});
		const library_idx = library.findIndex((ele) => ele.id == id);
		library.splice(library_idx, 1);
	});
}

function displayAvailableBooks() {
	if (library.length == 0) {
		return;
	}
	library.forEach((book) => {
		displayRow(book);
	});
}

displayAvailableBooks();

function getNewBook() {
	const bookInfoEls = document.querySelectorAll(".book-info");

	const title = bookInfoEls[0].value;
	const author = bookInfoEls[1].value;
	const noOfPages = bookInfoEls[2].value;
	const status = bookInfoEls[3].value;

	const newBook = new Book(title, author, noOfPages, status);
	for (let key in newBook) {
		if (newBook[key] == "") {
			alert(`${key} is empty`);
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
