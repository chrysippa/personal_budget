# Personal Budget API 
> An API that uses envelope budgeting concepts to help users manage their money. :envelope:

Envelope budgeting is the practice of splitting up each month's funds into separate "envelopes" - physical or otherwise - for different categories of expenses. For example, someone with a $1000 monthly income might allocate $500 for rent, $200 for groceries, and so on - not exceeding $1000. Once the funds in an envelope are spent, you have no more money for that category until next month! A tried and true method for spending only what you need.

This API aims to mimic a physical set of budgeting envelopes. Users can create, read, update, and delete envelopes with custom names and limits.

## Technologies Used
- Node.js - version 14.17.0
- Express - version 4.17.1

## Features
Users can:
- Set up spending category envelopes with specific amounts
- Spend money from an envelope without overdrawing funds
- Transfer money from one envelope to another, eg, from a "dining out" category to a "groceries" category, providing for flexibility

## Setup
This project is not yet deployed online. 

Clone it to access on your local machine - first ensure you have Node.js and npm installed.

In the project directory, run to install dependencies:

`npm install`

Still in the project directory, start the server:  (default port is 3000)

`node server.js`

To use, prefix all endpoints with localhost and port number, eg:

`localhost:3000/envelopes`

## Usage
An envelope is a JavaScript object with an id (number), name (string), and monthly limit (number):

`{"name": "utilities", "limit": 100, "id": 1}`

Unique IDs are assigned by the API and used to access envelopes once created. 

Refer to the endpoints listed below for functionality. Some endpoints require a JSON body.

## Endpoints
#### GET requests
| Endpoint      | Description                             |
|---------------|-----------------------------------------|
| /             | Returns a listing of endpoints          |
| /envelopes    | Returns an array of all envelopes       |
| /envelopes/id | Returns envelope object specified by ID |
#### POST requests
| Endpoint                        | Description                                                | JSON-formatted body (required) |
|---------------------------------|------------------------------------------------------------|--------------------------------|
| /envelopes                      | Creates envelope                                           | {"name": "", "limit": 0}       |
| /envelopes/spend/id             | Withdraws from envelope, if sufficient funds available     | {"amount": 0}                  |
| /envelopes/transfer/fromId/toId | Transfers between envelopes, if sufficient funds available | {"amount": 0}                  |
#### PUT requests
| Endpoint      | Description                     | JSON-formatted body (required) |
|---------------|---------------------------------|--------------------------------|
| /envelopes/id | Updates envelope name and limit | {"name": "", "limit": 0}       |
#### DELETE requests
| Endpoint      | Description                |
|---------------|----------------------------|
| /envelopes/id | Deletes specified envelope |

## Project Status
Project is: _on hiatus_ (until I reach part 2 of the project and add a database to store data).

## Room for Improvement
This project is a work in progress.

To do:
- Refactor and improve verification for user input
- Alter homepage to return an HTML file with endpoint information

## Acknowledgements
This project fulfills the Personal Budget Part 1 project of the [Codecademy Back-End Engineer](https://www.codecademy.com/learn/paths/back-end-engineer-career-path) learning path.