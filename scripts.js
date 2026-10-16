function Book(title, author, noOfPages, status) {
	if (!new.target) {
		throw Error(
			"You must use the 'new' operator to call the Book constructor",
		);
	}
	this.id = self.crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.noOfPages = noOfPages;
	this.status = status; // Not started, Reading, Complete
	this.changeStatus = function (newStatus) {
		this.status = newStatus;
	};
}

const book1 = new Book("Book1", "Author1", 123, "read");
const book2 = new Book("Book2", "Author2", 234, "unread");
const book3 = new Book("Book3", "Author3", 345, "read");

const library = [book1, book2, book3];

const bookListEl = document.querySelector(".book-list");

function displayBook(book) {
	const bookSnippetEl = document.createElement("section");
	bookSnippetEl.dataset.id = book.id;
	bookSnippetEl.classList.add("snippet");
	bookListEl.appendChild(bookSnippetEl);

	const bookDetails = ["title", "author", "noOfPages"];

	for (let x of bookDetails) {
		const bookDataEl = document.createElement("div");
		bookDataEl.dataset.id = book.id; // check if this is necessary
		bookDataEl.classList.add(`book-${x}`);
		bookDataEl.innerText = book[x];
		bookSnippetEl.appendChild(bookDataEl);
	}

	const changeStatusBtn = document.createElement("button");
	changeStatusBtn.type = "button";
	changeStatusBtn.innerText = book.status;
	changeStatusBtn.dataset.id = book.id;
	bookSnippetEl.appendChild(changeStatusBtn);
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
		this.textContent = newStatus;
	});

	const deleteBtnEl = document.createElement("button");
	deleteBtnEl.type = "button";
	deleteBtnEl.textContent = "Remove";
	deleteBtnEl.dataset.id = book.id;
	bookSnippetEl.appendChild(deleteBtnEl);
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
		displayBook(book);
	});
}

displayAvailableBooks();

const formEl = document.querySelector("form");
const newBookBtnEl = document.querySelector("#new-book-btn");
const cancelBtnEl = document.querySelector("#cancel-btn");
newBookBtnEl.addEventListener("click", () => {
	formEl.classList.remove("display-none");
});

cancelBtnEl.addEventListener("click", () => {
	formEl.classList.add("display-none");
});

// const bookInfoEls = document.querySelectorAll(".book-info");

const titleIpConEls = document.querySelector(
	".book-title-ip-row > .input-container",
);
const authorIpConEls = document.querySelector(
	".book-author-ip-row > .input-container",
);
const nopIpConEls = document.querySelector(
	".book-nop-ip-row > .input-container",
);
const statusIpConEls = document.querySelector(
	".book-status-ip-row > .input-container",
);
console.log(statusIpConEls);

// There must be a neater way to do this
// const inConEls = [titleIpConEls, authorIpConEls, nopIpConEls, statusIpConEls];
// inConEls.forEach((el) => {});

// function checkValidity(elementContainer) {}
// const checkValidity = {};

const titleIpEl = titleIpConEls.querySelector("input");
const titleErrorEl = titleIpConEls.querySelector(".error");
function validateTitle() {
	if (titleIpEl.value == "") {
		titleErrorEl.classList.remove("display-none");
		titleErrorEl.textContent = "Book title must be filled!";
		return false;
	}
	titleErrorEl.classList.add("display-none");
	titleErrorEl.textContent = "";
	return true;
}
titleIpEl.addEventListener("input", validateTitle);

const authorIpEl = authorIpConEls.querySelector("input");
const authorErrorEl = authorIpConEls.querySelector(".error");
function validateAuthor() {
	if (authorIpEl.value == "") {
		authorErrorEl.classList.remove("display-none");
		authorErrorEl.textContent = "The author must be filled!";
		return false;
	}
	authorErrorEl.classList.add("display-none");
	authorErrorEl.textContent = "";
	return true;
}
authorIpEl.addEventListener("input", validateAuthor);

const nopIpEl = nopIpConEls.querySelector("input");
const nopErrorEl = nopIpConEls.querySelector(".error");
function validateNop() {
	if (nopIpEl.value == "") {
		nopErrorEl.classList.remove("display-none");
		nopErrorEl.textContent = "Please enter numbers!";
		return false;
	}
	if (Number(nopIpEl.value) < 1) {
		nopErrorEl.classList.remove("display-none");
		nopErrorEl.textContent = "Number of pages can not be zero or less";
		return false;
	}
	nopErrorEl.classList.add("display-none");
	nopErrorEl.textContent = "";
	return true;
}
nopIpEl.addEventListener("input", validateNop);

const statusIpEl = statusIpConEls.querySelector("select");
console.log(statusIpEl);

function addNewBook(title, author, nop, status) {
	const newBook = new Book(title, author, nop, status);
	if (newBook) {
		library.push(newBook);
		displayBook(newBook);
	}
}

const addBtnEl = document.querySelector("#add-btn");
function validate() {
	if (validateTitle() == false) {
		return false;
	}
	if (validateAuthor() == false) {
		return false;
	}
	if (validateNop() == false) {
		return false;
	}
	return true;
}

function clearForm() {
	titleIpEl.value = "";
	authorIpEl.value = "";
	nopIpEl.value = "";
	statusIpEl.value = "Not Started";
}

addBtnEl.addEventListener("click", () => {
	if (validate() == true) {
		addNewBook(
			titleIpEl.value,
			authorIpEl.value,
			nopIpEl.value,
			statusIpEl.value,
		);
		clearForm();
	}
});
