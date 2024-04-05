export const cardNumValidate = (value) => {
  if (!value) {
    return {
      eState: true,
      eMsg: "This field is required.",
    };
  }
  let length = value.length;
  if (length !== 16) {
    return {
      eState: true,
      eMsg: "Enter 16 digits.",
    };
  } else {
    return {
      eState: false,
      eMsg: "",
    };
  }
};

export const cardExpirationDateValidate = (value) => {
  if (!value) {
    return {
      eState: true,
      eMsg: "Required.",
    };
  }
  let length = value.length;
  if (length !== 5) {
    return {
      eState: true,
      eMsg: "Valid format DD/MM",
    };
  } else {
    return {
      eState: false,
      eMsg: "",
    };
  }
};

export const phoneNumValidate = (value) => {
  if (!value) {
    return {
      eState: true,
      eMsg: "This field is required.",
    };
  }
  let length = value.length;
  if (length !== 9) {
    return {
      eState: true,
      eMsg: "Enter 9 digits",
    };
  } else {
    return {
      eState: false,
      eMsg: "",
    };
  }
};

export const passwordValidate = (pass, confirmedPass) => {
  let length = pass.length;
  if (length < 4) {
    return {
      eState: true,
      eMsg: "Min 4 digits",
    };
  }
  if (pass !== confirmedPass) {
    return {
      eState: true,
      eMsg: "Passwords are not the same",
    };
  } else {
    return {
      eState: false,
      eMsg: "",
    };
  }
};
