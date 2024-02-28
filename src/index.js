import { initializeApp } from "firebase/app";

// Firebase Firestore imports
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

// Authentication imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAtCx3CLclo-cDH9K_psQJCri9uho1hCrk",
  authDomain: "fir-9-690b4.firebaseapp.com",
  projectId: "fir-9-690b4",
  storageBucket: "fir-9-690b4.appspot.com",
  messagingSenderId: "698947287277",
  appId: "1:698947287277:web:e511bd773a50376812f4e4",
};

initializeApp(firebaseConfig);

// initializaing the firestore
const db = getFirestore();

// initializaing the authentication
const auth = getAuth();

const collectionRef = collection(db, "userData");

// Querying my database to get a single document
const user = query(collectionRef, orderBy("createdAt"));

let userArray = [];

let FullName = document.getElementById("FullName");
let Email = document.getElementById("Email");
let AddBtn = document.getElementById("addUser");

AddBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  const userDetails = {
    FullName: FullName.value,
    Email: Email.value,
    createdAt: serverTimestamp(),
  };
  console.log(userDetails);
  addDoc(collectionRef, userDetails)
    .then(() => {
      FullName.value = "";
      Email.value = "";
      console.log("Document successfully written!", userDetails);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});

// Reference to the table body
let tableBody = document.getElementById("screen");

// // Getting documents in real-time
// onSnapshot(collectionRef, (querySnapshot) => {
//   // Clear previous HTML content
//   tableBody.innerHTML = "";

//   // Clear userArray before pushing new data
//   userArray = [];

//   querySnapshot.forEach((doc) => {
//     userArray.push({ ...doc.data(), id: doc.id });
//     console.log(doc.data());
//   });

//   console.log("Users Array", userArray);

//   // Create HTML string inside the loop
//   let htmlString = "";
//   userArray.forEach((user) => {
//     htmlString += `
//             <tr>
//                 <td>${user.id}</td>
//                 <td>${user.FullName}</td>
//                 <td>${user.Email}</td>
//             </tr>
//         `;
//   });

//   // Append the HTML string to the table body
//   tableBody.innerHTML = `
//         <table className="border">
//             <tr>
//                 <th>ID</th>
//                 <th>Full Name</th>
//                 <th>Email</th>
//             </tr>
//             ${htmlString}
//         </table>
//     `;
// });

// Getting Document in real time
onSnapshot(collectionRef, (querySnapshot) => {
  userArray = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    userArray.push({ ...doc.data(), id: doc.id });
    console.log("Document Data : ", doc.data());
  });

  console.log("User Array : ", userArray);

  // Create HTML string inside the loop
  let htmlString = "";
  userArray.forEach((user) => {
    htmlString += `
    <tr>
        <td>${user.id}</td>
        <td>${user.FullName}</td>
        <td>${user.Email}</td>
        <td class="d-flex gap-3 align-items-center">
            <button onclick="EditUser('${user.id}')" class="btn btn-info">Edit</button>
            <button class="btn btn-danger">Delete</button>
        </td>
    </tr>
`;
  });

  // Append the HTML string to the table body
  tableBody.innerHTML = `
        <table className="border">
            <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            ${htmlString}
        </table>
    `;
});

function EditUser(id) {
  alert("cool");
  console.log("User Id : ", id);
}

// Deleting document
let id = document.getElementById("deleteId");
document.getElementById("deleteUser").addEventListener("click", (ev) => {
  ev.preventDefault();
  let UserId = id.value;
  if (UserId === "") {
    alert("Please Enter User Id");
    return;
  } else {
    const docReference = doc(db, "userData", UserId);
    const deleteAcc = deleteDoc(docReference)
      .then(() => {
        alert("Document successfully deleted!");
        id.value = "";
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
        alert("Error deleting document: ", error);
      });
    if (!deleteAcc) {
      alert("User Not Found");
      return;
    }
  }
  console.log("User Id : ", id.value);
});

// Getting document for a single user
let userReference = doc(db, "userData", "6kzdpseOCELTcCKffBQ2");
onSnapshot(userReference, (doc) => {
  console.log("Single User data: ", doc.data());
  const timeRegistered = doc.data().createdAt;
  const date = timeRegistered.toString();
  //  const time = date.getTime().toLocalTime()

  console.log("Time Registered", date);
});

// Updating a single document
const userId = document.getElementById("userId");
const userFullName = document.getElementById("UpdateFullName");
const userEmail = document.getElementById("UpdateEmail");

document.getElementById("Update").addEventListener("click", (ev) => {
  ev.preventDefault();
  const docRef = doc(db, "userData", userId.value);
  updateDoc(docRef, {
    FullName: userFullName.value,
    Email: userEmail.value,
  }).then(() => {
    console.log("Document Updated Successfully");
    userId.value = "";
    userFullName.value = "";
    userEmail.value = "";
  });
});

// Sign Up User

let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let signBtn = document.getElementById("SignUp");

signBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  if (password.value !== confirmPassword.value) {
    return alert("Password does not match");
  } else {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredentials) => {
        console.log("User Signed Up Succesfully", userCredentials.user);
        alert("User Signed Up Successfully");
      })
      .catch((err) => {
        alert("Error Signing Up User! " + err.message);
        console.log("Error Signing Up User", err);
      });
  }
});

// Login Functions
let loginEmail = document.getElementById("logEmail");
let loginPassword = document.getElementById("logPassword");
let loginBtn = document.getElementById("Login");

loginBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  if (!loginEmail.value || !loginPassword.value) {
    alert("Please Enter Email and Password");
    return;
  } else {
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
      .then((userDetails) => {
        console.log("User Loged In Successfully : ", userDetails.user);
        alert("User Logged In Successfully");
      })
      .catch((err) => {
        alert("Error Logging In User! " + err.message);
        console.log("Error Logging In User", err);
      });
  }
});
