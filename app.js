const saveBtn = document.getElementById('save')
const cloose = document.getElementById('close')
const addBtn = document.getElementById('add')
const tilte = document.querySelector("input")
const content = document.querySelector("textarea")
const h1 = document.querySelector('h1')
const cardList = document.querySelector('.cart-container')
const notebookTitle = document.querySelector('.title')
const cardClick = document.querySelector('.cart')

const monthA = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]")

function showNotes() {
    let html = "";
    if (notes) {
        notes.forEach((note, index) => {
            html += `
        <div class="cart" ondblclick="editNotes(${index},'${note.title}', '${note.content}');">
        <div class="cart-header">
             <p>${note.content}</p>
        </div>
        <div class="cart-footer">
            <div class="cart-title">${note.title}</div>
            <div class="date">${note.date}</div>
            <button id="close-btn" onclick=deleteNotes(${index})><i class="fa-solid fa-xmark"></i></button>
        </div>
     </div>
       `
        });
        cardList.innerHTML = html;
    }
}
showNotes()

let update = false, updateId;

function editNotes(noteId, title, cont) {
    addBtn.click()
    update = true;
    updateId = noteId
    tilte.value = title
    content.value = cont
    h1.innerText = "Update Note"
}

function deleteNotes(noteId) {
    notes.splice(noteId, 1)
    localStorage.setItem("notes", JSON.stringify(notes))
    showNotes()
}

let clicks = 0
function clickCounter() {
    clicks += 1 / 2
    let clickHTML = "";
    notes.forEach(click => {
        clickHTML = `
        <div class="title">
         <h2>NOTEBOOK</h2>
          <h4>${click.clik} notes</h4>
        </div>
        `
    })
    notebookTitle.innerHTML = clickHTML;
}
clickCounter()


saveBtn.addEventListener("click", e => {
    e.preventDefault()
    let noteTitle = tilte.value;
    let noteContent = content.value;
    let date = new Date(),
        day = date.getDay(),
        month = monthA[date.getMonth()],
        year = date.getFullYear()
     
    let noteİnfo = {
        title: noteTitle,
        content: noteContent,
        date: `${day}-${month}-${year}`,
        clik: clicks
    }
    if (noteContent || noteTitle) {
        if (update == true) {
            notes[updateId] = noteİnfo
            noteİnfo["clik"] = updateId + 1
        } else{
            notes.push(noteİnfo)
        }
        localStorage.setItem("notes", JSON.stringify(notes))
        showNotes()
        clickCounter()
    }
    cloose.click()
})
//enter keyword //
content.addEventListener("keydown", (event) => event.key === "Enter" && saveBtn.click())
tilte.addEventListener("keydown", (event) => event.key === "Enter" && saveBtn.click())

cloose.addEventListener('click', (c) => {
    c.preventDefault()
    update = false
    tilte.value = "";
    content.value = "";
    h1.innerText = "Add a New Note"
    clicks = notes.length + 1/2

})
