# **API Quotes**

API Quotes là miễn phí, mã nguồn mở. Nó được xấy dựng từ nhu cầu sử dụng của một coder để gọi gọi từ web Portfolio. Cơ sở dữ liệu MongoDB.

## Code Quality

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=vkhangstack_api-quotes)](https://sonarcloud.io/dashboard?id=vkhangstack_api-quotes)

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/dashboard?id=vkhangstack_api-quotes)

## Server

| Name       | URL                                     | Description                                       |
| :--------- | :-------------------------------------- | :------------------------------------------------ |
| Staging    | https://stage-api-quotes.herokuapp.com/ | Synced with the stating branch of this repository |
| Production | ""                                      | The primary API server                            |

## API Reference

### Get all quotes

> **GET** /api/quotes

Trả về tất cả các cả các quotes.

### Response

```js
{
    _id: oid,
    quote: String,
    author: String,
    tags: [],
    length: Number,
    createdAt: Date,
    updatedAt: Date
    __v: 0
}
```

#### Example request

> https://stage-api-quotes.herokuapp.com/api/quotes
