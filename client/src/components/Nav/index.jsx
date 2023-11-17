// import Auth from "../../../utils/auth";
// import { Nav } from "react-router-dom";

// function Nav() {
//     function showNavigation() {
//         if (Auth.loggedIn()) {
//             return (
//                 <Nav>
//                     <div>
//                         <h1>Rental Review</h1>
//                         <input placeholder="Select a new city"></input>
//                         <Button >find</Button>
//                     </div>
//                     <div>
//                         <Button href="/" onClick={() => Auth.logout()}>Logout</Button>
//                     </div>

//                 </Nav>
//             )
//         } else {
//             return (
//                 <nav>
//                 <div>
//                     <h1>Rental Review</h1>
//                     <input placeholder="Select a new city"></input>
//                     <Button >find</Button>
//                 </div>
//                 <div>
//                     <Button href="/login" onClick={() => Auth.logout()}>Login</Button>
//                     <Button href="/signup">Sign up</Button>
//                 </div>

//             </nav>
//             )
//         }
//     }

// }

// export default Nav;