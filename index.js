//INPUT ELEMENTS
const user_name = document.getElementById("user_name");
const user_email = document.getElementById("user_email");
const user_password = document.getElementById("user_password");
const user_confirmpassword = document.getElementById("user_confirmPassword");
//SUBMIT BUTTON ELEMENT
const createAccount_btn = document.getElementById("craeteAccount_btn");
//INPUT ERROR FIELDS
const userNameError = document.querySelector("#user_name_error");
const userEmailError = document.querySelector("#user_email_error");
const userPasswordError = document.querySelector("#user_password_error");
const userConfirmPasswordError = document.querySelector(
  "#user_confirmpassword_error"
);
//WELCOME EMAIL

let newUser = {};
////////DISPLAY ERRORS///////////
const displayError = (errorMessage, errorField) => {
  errorField.textContent = "";
  errorField.insertAdjacentText("beforeend", `${errorMessage}`);
};
///////VALIDATION//////
const checkUsernameValidation = (username) => {
  const nameRegex = /^[A-z][A-Za-z0-9]{3,13}[A-z]$/g;
  try {
    if (!username) throw new Error("please enter user name");
    if (!nameRegex.test(username)) throw new Error("Invalid username");
    userNameError.textContent = "";
    return username;
  } catch (err) {
    displayError(err.message, userNameError);
  }
  
};
const checkEmailValidation = (useremail) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  ///^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  try {
    if (!useremail) throw new Error("please enter email");
    if (!emailRegex.test(useremail)) throw new Error("Invalid email");
    userEmailError.textContent = "";
    return useremail;
  } catch (err) {
    displayError(err.message, userEmailError);
  }
  
};
const checkPasswordValidation = (userpassword) => {
  //const passwordRegex = /^[A-za-z0-9]{8,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/
  try {
    if (!userpassword) throw new Error("please enter password");
    if (!passwordRegex.test(userpassword)) throw new Error("Invalid password");
    userPasswordError.textContent = "";
    return userpassword;
  } catch (err) {
    displayError(err.message, userPasswordError);
  }
 
};
const checkConfirmPasswordValidation = (userpassword, userconfirmpassword) => {
  //const passwordRegex = /^[A-za-z0-9]{8,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/
  try {
    if (!userconfirmpassword) throw new Error("please enter password");
    if (
      userconfirmpassword !== userpassword ||
      !passwordRegex.test(userconfirmpassword)
    )
      throw new Error("Invalid password");
    userConfirmPasswordError.textContent = "";
    return userpassword;
  } catch (err) {
    displayError(err.message, userConfirmPasswordError);
  }
};
/////////////SUBMIT FORM ////////////
createAccount_btn.addEventListener("click", function (e) {
  e.preventDefault();
  newUser.username = checkUsernameValidation(user_name.value);
  newUser.email = checkEmailValidation(user_email.value);
  newUser.password = checkPasswordValidation(user_password.value);
  newUser.password_confirmation = checkConfirmPasswordValidation(
    user_password.value,
    user_confirmpassword.value
  );
  console.log(newUser);
  if (
    !newUser.username ||
    !newUser.email ||
    !newUser.password ||
    !newUser.password_confirmation
  ) {
    return
  }
    fetch("https://goldblv.com/api/hiring/tasks/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if(!response.ok) throw new Error("network error")
        return response.json()
      })
      .then((res) => {
        if(!res.errors) {
          
          document.cookie = `userEmail=${res.email}`;
          window.location.href = "./loggedin.html"
          return
        }
        throw res.errors
       
      })
      .catch((err) => {
        if(err.password) return displayError(err.password[0],userPasswordError )
        if(err.username) return displayError(err.message,userNameError )
        if(err.email) return displayError(err.message,userEmailError )
      });

});
//////////////FETCHING DATA////////////////
//https://goldblv.com/api/hiring/tasks/register,
