let myLibrary = [];

let newBookBtn = document.querySelector("#new-book")
let form = document.querySelector("form");

function Book(title, author, pages, isRead = false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
        let info = `${this.title} by ${this.author}, ${pages} pages`;
        if(this.isRead){
            info += ", already read";
        } else {
            info += ", not read yet";
        }
        return info;
    }
}

function addBookToLibrary(event) {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;

    let radio = document.querySelector("input[name='read']");
    isRead = radio.checked ? true : false;

    let newBook = new Book(title, author, pages, isRead);

    myLibrary.push(newBook);
    updateList();
    event.preventDefault();
    document.querySelector("form").reset();

}

let list = document.querySelector(".books ul");
function updateList(){
    list.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++){
        let li = document.createElement("li");

        let p = document.createElement("p");
        p.textContent = myLibrary[i].info();
        p.setAttribute("data-index", i);

        let btn = document.createElement("button");
        btn.textContent = "Delete"
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
            if(myLibrary[index].isRead){
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

/*Test
let theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 295, true);
let theHobbit69 = new Book("The Hobbit 69", "J. R. R. Tolkien", 296, false);

myLibrary.push(theHobbit);
myLibrary.push(theHobbit69);*/

updateList();


document.querySelector("button[type='submit']").addEventListener("click", addBookToLibrary);

newBookBtn.addEventListener("click", () => {
    form.classList.toggle("hidden");
});