# **API Quotes**

The Quotes API is free, open source. It was built from the needs of a coder to call from the web Portfolio. MongoDB database.

## Code Quality

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=vkhangstack_api-quotes)](https://sonarcloud.io/dashboard?id=vkhangstack_api-quotes)

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/dashboard?id=vkhangstack_api-quotes)

[![GitHub license](https://img.shields.io/github/license/vkhangstack/api-quotes?style=plastic)](https://github.com/vkhangstack/api-quotes/)

# **Documents product**

## Server

| Name       | URL                                     | Description                                       |
| :--------- | :-------------------------------------- | :------------------------------------------------ |
| Staging    | https://stage-api-quotes.herokuapp.com/ | Synced with the stating branch of this repository |
| Production | ""                                      | The primary API server                            |

## API Reference

### Get list quotes

> **GET** /api/quotes

Returns all quotes.

#### Example request

> https://stage-api-quotes.herokuapp.com/api/quotes

### Response

```js
[
  {
    _id: oid,
    quote: String,
    author: String,
    tags: [],
    length: Number,
    language: String,
    createdAt: Date,
    updatedAt: Date
    __v: 0
}
...
]
```

### Get random quote

> **GET** /api/query

#### Query parameters

| param | type     | Description                                                     |
| :---- | :------- | :-------------------------------------------------------------- |
| quote | `String` | Set quote=random for random quote                               |
| max   | `Int`    | The maximum Length in characters ( can be combined with `min` ) |
| min   | `Int`    | The minimum Length in characters ( can be combined with `max` ) |

```js
{
    _id: oid,
    quote: String,
    author: String,
    tags: [],
    length: Number,
    language: String,
    createdAt: Date,
    updatedAt: Date
    __v: 0
}
```

#### Examples

Random Quote [try in browser](https://stage-api-quotes.herokuapp.com/api/query?quote=random)

```HTTP
GET /api/query?quote=random
```

Random Quote with a maximum length of 50 characters [try in browser](https://stage-api-quotes.herokuapp.com/api/query?quote=random&max=50)

```HTTP
GET /api/query?quote=random&max=50
```

Random Quote with a minium length of 50 characters [try in browser](https://stage-api-quotes.herokuapp.com/api/query?quote=random&min=50)

```HTTP
GET /api/query?quote=random&min=50
```

Random Quote with a length between 50 and 140 characters [try in browser](https://stage-api-quotes.herokuapp.com/api/query?quote=random&min=50&max=140)

```HTTP
GET /api/query?quote=random&min=50&max=140
```

## Usage

Get a random quote (fetch)

```js
fetch("https://stage-api-quotes.herokuapp.com/api/query?quote=random")
  .then((response) => response.json())
  .then((data) => {
    console.log(`${data.quote} — ${data.author}`);
  });
```

Get a random quote (async/await)

```js
async function randomQuote() {
  const response = await fetch(
    "https://stage-api-quotes.herokuapp.com/api/query?quote=random",
  );
  const data = await response.json();
  console.log(`${data.quote} — ${data.author}`);
}
randomQuote();
```

Get a random quote (JQuery)

```js
$.getJSON(
  "https://stage-api-quotes.herokuapp.com/api/query?quote=random",
  function (data) {
    console.log(`${data.quote} — ${data.author}`);
  },
);
```
