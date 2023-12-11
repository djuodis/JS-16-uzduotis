const fullName = document.getElementById("fullName")
const add = document.getElementById("add")
const output = document.getElementById("output")
let personArray = [] 

add.addEventListener("click", () => {
    if (!fullName.value) return alert("Laukelis tuščias")

    const [name, surname] = fullName.value.split(" ")

    const person = {
        name: name,
        surname: surname
    }

    personArray.push(person)  
    saveToLocalStorage(personArray)

    fullName.value = ""

    displayStoredPersons()
})

function saveToLocalStorage(data) {
    const serializedData = data.map(person => `${person.name} ${person.surname}`).join(';')
    localStorage.setItem("personData", serializedData) 
}

function loadFromLocalStorage() {
    const storedData = localStorage.getItem("personData")
    return storedData ? storedData.split(';').map(item => {
        const [name, surname] = item.split(' ')
        return { name, surname }
    }) : []
}

function displayStoredPersons() {
    output.innerHTML = "" 

    const storedPersons = loadFromLocalStorage()

    storedPersons.forEach(person => {
        const row = document.createElement("tr")
        const nameCell = document.createElement("td")
        const surnameCell = document.createElement("td")

        nameCell.textContent = person.name
        surnameCell.textContent = person.surname

        row.appendChild(nameCell)
        row.appendChild(surnameCell)

        output.appendChild(row)
    })
}

document.addEventListener("DOMContentLoaded", function() {
    displayStoredPersons()
})

