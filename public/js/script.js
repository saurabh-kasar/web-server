console.log('Client-side js loaded!')


const wform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-one')
const message2 = document.querySelector('#message-two')

wform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('http://localhost:3000/forecast?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            message1.textContent = data.error
        } else{
            message1.textContent = data.location
            message2.textContent = data.forecast
        }
    })
})
})