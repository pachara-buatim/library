const addBookBtn = document.querySelector(".add-book-btn");
const addBookPopup = document.querySelector(".add-book-popup");
const popupOverlay = document.querySelector(".popup-overlay");
const popupAddBtn = document.querySelector(".popup-add-btn");
const popupCancelBtn = document.querySelector(".popup-cancel-btn");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const statusInput = document.querySelector("#status");

let popup = false;

function clearInput() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  statusInput.selectedIndex = 0;
}

addBookBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  addBookPopup.style.display = "flex";
  popupOverlay.style.display = "flex";
  popup = true;
  clearInput();
})

addBookPopup.addEventListener("click", (event) => {
  event.stopPropagation();
})

popupCancelBtn.addEventListener("click", () => {
  addBookPopup.style.display = "none";
  popupOverlay.style.display = "none";
  popup = false;
})

document.addEventListener("click", () => {
  if (popup) {
    addBookPopup.style.display = "none";
    popupOverlay.style.display = "none";
    popup = false;
  }
})

const library = [];

function Book(title, author, pages, status) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function showBook(book) {
  const bookContainer = document.querySelector(".book-container");
  const tableRow = document.createElement("tr");
  const bookTitle = document.createElement("td");
  const bookAuthor = document.createElement("td");
  const bookPages = document.createElement("td");
  const statusCell = document.createElement("td");
  const statusBtn = document.createElement("button");
  const deleteBtnCell = document.createElement("td");
  const deleteBtn = document.createElement("button");

  deleteBtn.classList.add("delete-book-btn");
  tableRow.classList.add("book");
  statusBtn.classList.add("status-btn", book.status.toLowerCase().replace(" ", "-"));

  deleteBtn.innerText = "Delete";
  bookTitle.innerText = book.title;
  bookAuthor.innerText = book.author;
  bookPages.innerText = book.pages;
  statusBtn.innerText = book.status;

  statusCell.appendChild(statusBtn);
  deleteBtnCell.appendChild(deleteBtn);
  tableRow.appendChild(bookTitle);
  tableRow.appendChild(bookAuthor);
  tableRow.appendChild(bookPages);
  tableRow.appendChild(statusCell);
  tableRow.appendChild(deleteBtnCell);

  bookContainer.appendChild(tableRow);


  const statusState = [
    {text: "Not started", bgColor: "gray"},
    {text: "Reading", bgColor: "rgb(190, 155, 14)" },
    {text: "Read", bgColor: "green"}
  ];

  let currentStateIndex = statusState.findIndex(status => status.text === statusBtn.textContent);

  statusBtn.addEventListener("click", () => {
    currentStateIndex = (currentStateIndex + 1) % statusState.length;
    statusBtn.innerText = statusState[currentStateIndex].text;
    statusBtn.style.backgroundColor = statusState[currentStateIndex].bgColor;
  })

  deleteBtn.addEventListener("click", () => {
    tableRow.remove();

    const bookIndex = library.findIndex(libraryBook => libraryBook.id === book.id);
    library.splice(bookIndex, 1);
  })
}

function addBookToLibrary(event) {
  event.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const status = statusInput.value;

  const newBook = new Book(title, author, pages, status);

  library.push(newBook);

  showBook(newBook);

  addBookPopup.style.display = "none";
  popupOverlay.style.display = "none";
  popup = false;
}

popupAddBtn.addEventListener("click", addBookToLibrary);




