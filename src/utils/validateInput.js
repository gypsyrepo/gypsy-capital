export const validateInput = (inputValues, errorSetter) => {

  const validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let validPhoneNumber = /^[0]\d{10}$/;

  const errorsInit = {};
  let fields = { ...inputValues }

  for(const key in fields) {
    if(!fields[key]) {
      errorsInit[key] = "This field is required";
    } 
    if(fields.email && !fields.email.match(validMail)) {
      errorsInit.email = "Please enter a valid email address"
    } 
    if(fields.phoneNo && !fields.phoneNo.match(validPhoneNumber)) {
      errorsInit.phoneNo = "Please enter a valid phone number"
    }
    if(fields.password && fields.password.length < 8) {
      errorsInit.password = "Password must be at least 8 characters";
    }
    if(fields.confirmPassword && fields.confirmPassword !== fields.password) {
      errorsInit.confirmPassword = "Your password does not match"
    }
  }

  errorSetter(errorsInit);
  console.log(errorsInit);
  if(Object.entries(errorsInit).length === 0) {
    return true;
  } else {
    return false;
  }

}