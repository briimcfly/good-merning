# Project 3 Group 7 - Dwellex 

Dwellex is a web application that empowers renters to rate and review their rental experiences, providing valuable insights for future renters and landlords alike.

## Table of Contents

* [User Story](#user-story)
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Contributors](#contributors)
* [License](#license)
* [Assets](#assets)


## User Story

```As a potential renter, I seek a platform enabling location-based residency searches with ratings, detailed reviews covering maintenance, business practices, and landlord responsiveness. I aim to access authentic photos and videos for a holistic understanding of potential residencies. Additionally, I desire a platform facilitating landlord responses to reviews, ensuring transparency, and furthering my informed decision-making process.
```

## Technologies

This project was built using the MERN stack, with the following technologies:
* **Apollo**: A GraphQL client for interacting with GraphQL APIs.
* **Bcrypt**: A password hashing algorithm for secure password storage.
* **Chakra UI**: A React component library for creating accessible and stylish user interfaces.
* **Express**: A lightweight web framework for building Node.js applications.
* **Heroku**: A cloud platform for deploying and managing applications.
* **Google Cloud**: A cloud computing platform providing infrastructure and services.
* **Google Maps**: A mapping service for displaying property locations and neighborhoods.
* **GraphQL**:	An API query language for efficient data retrieval.
* **JSONWebToken**:	A standard for creating and verifying JSON Web Tokens (JWTs) for authentication.
* **MongoDB**: A NoSQL database for storing application data.
* **Multer**: A middleware for handling multipart data, such as file uploads.
* **Node.js**:	A JavaScript runtime environment for building server-side applications.
* **React**: A JavaScript library for building user interfaces.
* **Vite**: A frontend build tool for faster and more streamlined development.


## Installation 
Follow these steps to set up the project after cloning the repository:

### 1. Install Dependencies:
Navigate to the repository folder and run the following command to install all necessary dependencies:
```
npm install
```

### 2. Ensure MongoDB is Running:
Before proceeding, make sure that MongoDB is up and running on your machine.

### 3. Seed the Database 
Run the following command to seed the database 
```
npm run seed
```

### 4. Start the Development Server:
Once all dependencies are installed and MongoDB is operational, start the development server with:
```
npm run dev
```

These steps will get your development environment ready and the application running.


## Features

Dwellex offers a range of features for renters:

- Write reviews for rental properties they've lived in
- Rate properties using a 5-star rating system
- Include pictures of the property in their reviews
- View ratings and reviews of other properties
- Search for properties by neighborhood or address


## Usage


### Signing Up

- Visit the Dwellex website and click on the "Sign Up" button.
- Enter your email address, password, and desired username.
- Click on the "Create Account" button.


### Writing a Review
- After logging in, search the city you want to review properties in.
- Click on the "Add Review" button.
- Search for the property you want to review by neighborhood, address, or name.
- Click on the property listing you want to review.
- Select the star rating for the property.
- Write a detailed review of your experience living in the property.
- Optionally, upload pictures of the property to support your review.
- Click on the "Submit" button.


### Viewing Reviews

Search the city you want to review properties in.
Search for the property you want to view reviews for.
Click on the property listing.
Scroll down to the "Reviews" section.
Read the reviews from other renters.


## Contributors

https://github.com/briimcfly - Bryan Bickel

https://github.com/RaelNW - Rael Wanjala

https://github.com/Nozerone - Jose Posadas

https://github.com/Lven-Nemsy - Nedda Elsayed


## License

N/A


## Assets

https://github.com/briimcfly/good-merning

https://good-merning-e2cf23c7529f.herokuapp.com/

![Landing Page](<assets/Screenshot 2023-11-27 213536.png>)
![Login](<assets/Screenshot 2023-11-27 213610.png>)
![Review Form](<assets/Screenshot 2023-11-27 213741.png>)
![Review Page](<assets/Screenshot 2023-11-27 213833.png>)