# Node Task

![license](https://img.shields.io/github/license/mashape/apistatus.svg)

🛍 Simple Node.js shop API with multicurrency support written in [NestJS](https://github.com/nestjs/nest).

📦 Out-of-box web UI client is ready for testing endpoints. Jump to [#Usage](#usage) section.

## Features

- JWT auth system with mocked user (id 1)
- Displaying products _(using docker-compose, there are 3 by default)_
- Creating cart
- Adding and removing products to cart
- Checkout with specified currency calculation
- Automatic currency refreshment via [exchangeratesapi.io](https://api.exchangeratesapi.io/latest)

## Requirements

- Node 8+
- MongoDB
- Docker _(optional)_
- Docker-compose _(optional)_

## Installlation

```bash
cp .env.example .env

npm i
```

## Running

### Locally

1. Use default .env configuration.
2. Start the suite

```bash
docker-compose up -d
npm run start:dev
```

3. App should be available on [http://localhost:3000](http://localhost:3000)

### Production

Build and use app:

- standalone

```bash
npm run build
npm run start:prod
```

- via Docker

```bash
docker build -f .docker/app/Dockerfile -t node-task .
docker run node-task
```

## Testing

Source code is covered by unit and e2e tests.

```bash
npm run test        # unit
npm run test:e2e    # e2e
```

## Documentation

Documentation is available on [http://localhost:3000/docs](http://localhost:3000/docs) after running locally. It uses Swagger with exposed interactive UI.

## Usage

Project provides easy and neat way to use it's endpoints. This step-by-step demonstrates the whole shopping flow.

1. Install and setup local environment ([#installlation](#installlation), [#locally](#locally))
2. Enter Swagger UI documentation - [http://localhost:3000/docs](http://localhost:3000/docs). Collapse endpoint and use "Try it out" button to prepare requests.
3. Authenticate as mocked user

```
POST /auth

Body:
{
    "userId": "1"
}
```

4. Grab accessToken and set it via "Authorize" button on top-right corner of the page. Now you can use authenticated routes.
5. List available products

```
GET /product

Response:
{
  "products": [
    {
      "_id": "5e8cc2d61dacc56e21770f6d"
      ...
```

6. Take `_id` of one of products and create a cart

```
POST /cart

Response:
{
  "cart": {
    "_id": "5e8d02e2f7ae65060120d6e1"
    ...
```

7. Now, take `_id` of cart and add product into it

```
POST /cart/{id}/products

Params:
id = 5e8cc2d61dacc56e21770f6d

Body:
{
    "productId": "5e8cc2d61dacc56e21770f6d",
    "quantity": 1
}
```

8. Cart is finally ready to checkout with specified currency

```
POST /checkout/{cartId}

Params:
cartId = 5e8cc2d61dacc56e21770f6d

Body:
{
    "currency": "USD"
}
```

9. Calculated cart price in specified currency is available in response.

## Logs

[winston](https://github.com/winstonjs/winston) is used for logging through two transport layers:

- console (Nest-like)
- file (to `logs/` directory)

## License

Project is MIT-licensed. Feel free to use it and modify just the way you want.
