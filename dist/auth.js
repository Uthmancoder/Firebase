let UserEmail = document.getElementById("Email");
let userFullName = document.getElementById("FullName");
let userPassword = document.getElementById("Password");

document.getElementById("addUser").addEventListener("click", (ev)=>{
 ev.preventDefault();
    const userDetails = {
    FullName: userFullName.value,
    Email: UserEmail.value,
    Password: userPassword.value,
}
console.log("User Details : ",userDetails);
localStorage.setItem("userData", JSON.stringify(userDetails));
alert("SignUp Successfully");
})