# ProShop

<div align="center">

## Table of Contents

</div>

<div align="center">
    
<img src="https://user-images.githubusercontent.com/67344952/143984526-fbb3c235-5c4b-4d85-a4c4-9b11f84f05e4.gif" width="480" height="300"/>

</div>

#### Core Features

* Streamlined Customer Checkout Flow w/ Custom Cart System
* Secure Payment Methods via PayPal and Stripe Integration
* User / Admin Roles to Limit and Protect Access to Sensitive Endpoints

#### Technologies

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=mongodb&logoColor=4EA94B"/>  
 
<div align="center">
  
## Details
  
### API Design
  
| Resource     | Route             | HTTP Verbs  | Acess Level   |
| :----------- | :---------------- | :---------: | :---------:   |
| Users        | api/users         |  GET, POST  | Admin, All    |
|              | api/users/login   |  POST       | All           |
|              | api/users/profile |  GET, PUT   | Protected (2) |
|              | api/users/:id     |  GET, PUT, DELETE   | Protected (3) |
| Products     | api/products      |  GET, POST  | All, Protected & Admin |
|              | api/products/top  | GET         | All           |
|              | api/products/:id  |  GET, PUT, DELETE  | All, Protect & Admin (2) |
|              | api/products/:id/reviews  |  POST, PUT, DELETE  | Protected (3) |
| Orders       | api/orders        | GET, POST   | Protected, Protected & Admin |
|              | api/orders/myorders    | GET   | Protected |
|              | api/orders/:orderId    | GET   | Protected |
|              | api/orders/:orderId/pay    | PUT   | Protected |
|              | api/orders/:orderId/shipping    | PUT   | Protected & Admin |
  
</div>

<div align="center">

#### Database Schemas

| Table        | Column         |  Data Type  |
| ------------ | -------------- | :---------: |
| Users        | id             |   Object Id |
|              | isAdmin        |   Boolean   |
|              | name           |   String    |
|              | email          |   String    |
|              | password       |   String    |
|              | created_at     |   Timestamp |
|              | updated_at     |   Timestamp |
| Products     | id             |   Object Id |
|              | User           |   Object Id |
|              | name           |   String    |
|              | image          |   String    |
|              | brand          |   String    |
|              | category       |   String    |
|              | description    |   String    |
|              | reviews        |[ Object Id ]|
|              | price          |   Number    |
|              | number_in_stock|   Number    |
| Reviews      | name           |   String    |
|              | rating         |   Number    |
|              | comment        |   String    |
|              | User           |   Object Id |
| Orders       | id             |   Object Id |
|              | User           |   Object Id |
|              | order_total    |   Number    |
|              | tax_price      |   Number    |
|              | shipping_price |   Number    |
|              | total_price    |   Number    |
|              | is_paid        |   Boolean   |
|              | is_delivered   |   Boolean   |
|              | order_items    | { Product,<br> quantity: Number } |
|              |shipping_address| { address: String,<br> city: String,<br> postal_code: String,<br> country: String } |
|              | payment_method |   String    |
|              | payment_result | { id: Object Id, <br> status: String, <br> update_time: timestamp, <br> email: String } |
|              | delivered_at   |  Timestamp  |
|              |    paid_at     |  Timestamp  |

</div>

<div align="center">

#### Protected Routes

</div> 
   In version 2, Google Firebase is used for authentication. When the client authenticates through Firebase, Firebase returns a lot of information about the user. In this use case, only a user id and email are passed to the server to store in the Postgres database. The user id is salted and used to generate a token (JWT) that is passed back to the user. Every request users make is validated by Express middleware. The middleware recieves the token and decodes it. If the token is valid, the the next middleware in the proper request cycle is called, otherwise the user recieves an error message.
