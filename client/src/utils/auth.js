// Importing decode function from 'jwt-decode' library
import decode from "jwt-decode";

// AuthService class responsible for managing authentication
class AuthService {
  // Method to retrieve user profile details from the stored token
  getProfile() {
    return decode(this.getToken()); // Decodes and returns the user's profile data from the stored token
  }

  // Method to check if the user is logged in by verifying the token's existence and expiration
  loggedIn() {
    const token = this.getToken(); // Retrieves the token from local storage

    if (token) {
      const decoded = decode(token); // Decode the token 
      const username = decoded.authenticatedUser.username; 

      // Checks if the token exists and is not expired by calling isTokenExpired method
      return { isLoggedIn: !this.isTokenExpired(token), username };
    }
  }

  // Method to check if the token is expired
  isTokenExpired(token) {
    const decoded = decode(token); // Decodes the token to access its expiration time

    // Compares the token's expiration time with the current time
    if (decoded.exp < Date.now() / 1000) {
      // Removes the expired token from local storage and returns true for token expiration
      localStorage.removeItem("id_token");
      return true;
    }
    // Returns false if the token is not expired
    return false;
  }

  // Method to retrieve the token from local storage
  getToken() {
    return localStorage.getItem("id_token"); // Retrieves the token from local storage
  }

  // Method to store the token in local storage upon user login
  login(idToken) {
    localStorage.setItem("id_token", idToken); // Sets the token in local storage
    window.location.reload(); // Reloads the current page after login
  }

  // Method to remove the token from local storage and reload the page upon user logout
  logout() {
    localStorage.removeItem("id_token"); // Removes the token from local storage
    window.location.reload(); // Reloads the current page after logout
  }
}

// Exporting an instance of the AuthService class to be used across the application
export default new AuthService();
