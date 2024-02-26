import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtCx3CLclo-cDH9K_psQJCri9uho1hCrk",
  authDomain: "fir-9-690b4.firebaseapp.com",
  projectId: "fir-9-690b4",
  storageBucket: "fir-9-690b4.appspot.com",
  messagingSenderId: "698947287277",
  appId: "1:698947287277:web:e511bd773a50376812f4e4",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const collectionRef = collection(db, "userData");

const userArray = [];

let FullName = document.getElementById("FullName");
let Email = document.getElementById("Email");

document.getElementById("addUser").addEventListener("click", (ev) => {
  ev.preventDefault();
  const userDetails = {
    FullName: FullName.value,
    Email: Email.value,
  };
  console.log(userDetails);
  addDoc(collectionRef, userDetails)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});

getDocs(collectionRef)
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      userArray.push({ ...doc.data(), id: doc.id });
      console.log(doc.data());
    });
    console.log("Users Array", userArray);
    userArray.forEach((user, id) => {
      document.getElementById("screen").innerHTML += `
       <Table className="border">
       <tr>
       <td>${user.id}</td>
       <td>${user.FullName}</td>
       <td>${user.Email}</td>
       </tr>
       </Table> 
       `;
    });
  })
  .catch((error) => {
    console.error("Error getting docufments:/ ", error);
  });

let id = document.getElementById("deleteId");
document.getElementById("deleteUser").addEventListener("click", (ev) => {
  ev.preventDefault();
  let UserId = id.value;
  if (UserId === "") {
    alert("Please Enter User Id");
    return;
  }else{
    const docReference =  doc(db, "userData", UserId);
   const deleteAcc =  deleteDoc(docReference).then(()=>{
     alert("Document successfully deleted!");
    }).catch((error)=>{
      console.error("Error deleting document: ", error);
    alert("Error deleting document: ", error);
    })
    if(!deleteAcc){
      alert("User Not Found");
      return;
    
    }
  }
  console.log("User Id : ", id.value);
});

// let screen = document.getElementById("screen");
