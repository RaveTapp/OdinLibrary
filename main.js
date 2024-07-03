let myLibrary = [];

let newBookBtn = document.querySelector("#new-book");
let form = document.querySelector("form");

class Book {
  title;
  author;
  pages;
  isRead;
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  get info() {
    let infoStr = `${this.title} by ${this.author}, ${this.pages} pages`;
    if (this.isRead) {
      infoStr += ", already read";
    } else {
      infoStr += ", not read yet";
    }
    return infoStr;
  }
}

let list = document.querySelector(".books ul");
function updateList() {
  list.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let li = document.createElement("li");

    let p = document.createElement("p");
    p.textContent = myLibrary[i].info;
    p.setAttribute("data-index", i);

    let btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.setAttribute("data-index", i);
    btn.setAttribute("class", "delete");

    btn.addEventListener("click", () => {
      let index = btn.getAttribute("data-index");
      myLibrary.splice(index, 1);
      updateList();
    });

    let toggleRead = document.createElement("button");
    toggleRead.textContent = "read book";
    toggleRead.setAttribute("data-index", i);
    toggleRead.setAttribute("class", "readBtn");

    toggleRead.addEventListener("click", () => {
      let index = toggleRead.getAttribute("data-index");
      if (myLibrary[index].isRead) {
        myLibrary[index].isRead = false;
      } else {
        myLibrary[index].isRead = true;
      }
      updateList();
    });

    li.appendChild(p);
    li.appendChild(toggleRead);
    li.appendChild(btn);

    list.appendChild(li);
  }
}

updateList();

function addBookToLibrary(event) {
  event.preventDefault();
  
  const form = document.querySelector("form");
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const radio = document.querySelector("input[name='read']");

  if(form.checkValidity()){
    isRead = radio.checked ? true : false;

    let newBook = new Book(title.value, author.value, pages.value, isRead);

    myLibrary.push(newBook);
    updateList();

    form.reset();
  } else {
    form.reportValidity();
  }
}

document
  .querySelector("button[type='submit']")
  .addEventListener("click", addBookToLibrary);

newBookBtn.addEventListener("click", () => {
  form.classList.toggle("hidden");
});
