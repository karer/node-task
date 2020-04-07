db.products.insertMany([
  {
    name: 'Blue denim',
    price: {
      amount: 10,
      currency: 'USD',
    },
    quantity: 5,
    description: 'New collection!',
  },
  {
    name: 'Flip poster',
    price: {
      amount: 50,
      currency: 'PLN',
    },
    quantity: 100,
  },
  {
    name: 'White t-shirt',
    price: {
      amount: 1,
      currency: 'EUR',
    },
    quantity: 1,
    description: 'Last on stock!',
  },
]);
