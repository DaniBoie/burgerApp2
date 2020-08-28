axios.get('/api/burgers')

  .then(burgers => {
    console.log(burgers.data)
    for (let i = 0; i < burgers.data.length; i++) {
      const element = burgers.data[i];

      let burgerElem = document.createElement('li')
      burgerElem.id = element.id
      burgerElem.className = 'list-group-item'

      if (element.purchased === 0) {
        burgerElem.innerHTML = `
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${element.name}</h5>
          </div>
          <p class="mb-1">Quantity: ${element.quantity}</p>
          <small>Price: $${element.cost}</small>
          <button class="purchase" id="purchase">Purchase</button>
    `
        document.getElementById('notPurchased').append(burgerElem)
      } else {
        burgerElem.innerHTML = `
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${element.name}</h5>
          </div>
          <p class="mb-1">Quantity: ${element.quantity}</p>
          <small>Price: $${element.cost}</small>
          <button class="remove" id="remove">Remove</button>
    `
        document.getElementById('purchased').append(burgerElem)
      }

    }
  })
  .catch(err => console.log(err))

document.getElementById('addGrocery').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/burgers', {
    name: document.getElementById('product').value,
    quantity: document.getElementById('quantity').value,
    cost: document.getElementById('cost').value,
    purchased: false
  })
    .then(({ data }) => {
      console.log(data)
      let groceryElem = document.createElement('li')
      groceryElem.id = data.id
      groceryElem.className = 'list-group-item'
      groceryElem.innerHTML = `
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${document.getElementById('product').value}</h5>
          </div>
          <p class="mb-1">Quantity: ${document.getElementById('quantity').value}</p>
          <small>Price: $${document.getElementById('cost').value}</small>
          <button class="purchase" id="purchase">Purchase</button>
    `
      document.getElementById('notPurchased').append(groceryElem)

      document.getElementById('product').value = ''
      quantity: document.getElementById('quantity').value = ''
      cost: document.getElementById('cost').value = ''
    })
    .catch(err => console.log(err))
})

document.addEventListener('click', event => {
  if (event.target.className === 'purchase') {
    console.log(event.target.parentNode.id)
    axios.put(`/api/burgers/${event.target.parentNode.id}`, { purchased: true })
      .then(() => {
        let groceryElem = document.createElement('li')
        groceryElem.className = 'list-group-item'
        groceryElem.id = event.target.parentNode.id

        document.getElementById('purchased').append(event.target.parentNode)
        event.target.parentNode.remove()
      })
      .catch(err => console.log(err))
  } else if (event.target.className === 'remove') {

    console.log(event.target.parentNode.id)
    axios.delete(`/api/burgers/${event.target.parentNode.id}`)
      .then(() => { event.target.parentNode.remove() })
      .catch(err => console.log(err))

  }
})


