
const form = document.getElementById('load-form')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const Amount = document.getElementById('amount').value
    localStorage.setItem('initialAmount', Amount)

    window.location.href = '../index.html'
    const loadedFunds = localStorage.getItem('initialAmount')

    
})


