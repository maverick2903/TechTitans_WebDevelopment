export function validateForm(data, setFeedback, formType) {
    // const username = data.username;
    // const password = data.password;
    // const role = data.role;
    // const mobile = data.mobile;

    // const regexPhone = /^(0|\+?91 ?)?[6-9][0-9]{4} ?[0-9]{5}$/;

    // const regexPassword =
    //     /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=\S+$).*$/;

    // if (
    //     username?.trim() === "" ||
    //     password?.trim() === "" ||
    //     role?.trim() === "" ||
    //     mobile?.trim() === ""
    // ) {
    //     setFeedback("Please fill all compulsory fields!");
    //     return false;
    // }

    // if (
    //     formType === "client" &&
    //     mobile?.trim() !== "" &&
    //     !regexPhone.test(mobile?.trim())
    // ) {
    //     setFeedback("Please enter a valid phone number!");
    //     return false;
    // } else if (password.trim().length < 8) {
    //     setFeedback("Password must be atleast 8 characters long!");
    //     return false;
    // } else if (!regexPassword.test(password.trim())) {
    //     setFeedback(
    //         "Password must contain atleast 1 special character, 1 numeric value and 1 uppercase & lowercase letter each!"
    //     );
    //     return false;
    // }

    return true;
}
