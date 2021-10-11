# **API Quotes**

API Quotes là miễn phí, mã nguồn mở. Nó được xấy dựng từ nhu cầu sử dụng của một coder để gọi gọi từ web portfolio và Github Profile. Cơ sở dữ liệu trên MongoDB Cloud. Trong tương sẽ có tính năng đóng góp những quotes từ cộng đồng.

## Code Quality

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=vkhangstack_api-quotes)](https://sonarcloud.io/dashboard?id=vkhangstack_api-quotes)

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/dashboard?id=vkhangstack_api-quotes)

## Server

| Name       | URL                                    | Description                                       |
| :--------- | :------------------------------------- | :------------------------------------------------ |
| Staging    | https://stage-vi-quotes.herokuapp.com/ | Synced with the stating branch of this repository |
| Production | ""                                     | The primary API server                            |

## API Reference

### Get all quotes

> **GET** /quotes

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
