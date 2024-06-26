let myLibrary = [];

function Book(title, author, pages, isRead = false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
        let info = `${this.title} by ${this.author}, ${pages} pages`;
        if(isRead){
            info += ", already read";
        } else {
            info += ", not read yet"
        }
        return info;
    }
}

document.querySelector("button[type='submit']").addEventListener("click", addBookToLibrary, false);

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



/*Test*/
//addBookToLibrary();
let theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 295, true);
let theHobbit69 = new Book("The Hobbit 69", "J. R. R. Tolkien", 296, false);

myLibrary.push(theHobbit);
myLibrary.push(theHobbit69);
/*console.log(theHobbit.info());
console.log(myLibrary[0].info());*/


let list = document.querySelector(".books ul");
function updateList(){
    list.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++){
        let li = document.createElement("li");
        li.textContent = myLibrary[i].info();
        list.appendChild(li);
    }
}


