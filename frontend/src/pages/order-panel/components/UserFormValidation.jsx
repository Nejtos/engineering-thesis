export const nameValidator = (value) => {
  let errorState = true;
  let errorMsg = "";
  const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if (!value) {
    errorState = true;
    errorMsg = "This field is required.";
    return {
      eState: errorState,
      eMsg: errorMsg,
    };
  } else if (!nameRegex.test(value)) {
    errorState = true;
    errorMsg = "Invalid email format.";
    return {
      eState: errorState,
      eMsg: errorMsg,
    };
  } else {
    errorState = false;
    return {
      eState: errorState,
      eMsg: "",
    };
  }
};

export const phoneNumValidator = (value) => {
  let errorState = true;
  let errorMsg = "";
  const phoneNumRegex =
    /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/;
  if (!value) {
    errorState = true;
    errorMsg = "This field is required.";
    return {
      eState: errorState,
      eMsg: errorMsg,
    };
  } else if (!phoneNumRegex.test(value)) {
    errorState = true;
    errorMsg = "Invalid phone number format.";
    return {
      eState: errorState,
      eMsg: errorMsg,
    };
  } else {
    errorState = false;
    return {
      eState: errorState,
      eMsg: "",
    };
  }
};

export const emailValidator = (value) => {
  let errorState = true;
  let errorMsg = "";
  const emailRegex =
    /^[a-z0-9A-Z!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9A-Z!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (!value) {
    errorState = true;
    errorMsg = "This field is required.";
    return {
      eState: errorState,
      eMsg: errorMsg,
    };
  } else if (!emailRegex.test(value)) {
    errorState = true;
    errorMsg = "Invalid email format.";
    return {
      eState: errorState,
      eMsg: errorMsg,
    };
  } else {
    errorState = false;
    return {
      eState: errorState,
      eMsg: "",
    };
  }
};

export const streetValidator = (value) => {
  let errorState = true;
  let errorMsg = "";
  const streetRegex = /^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]+$/;
  if (!value) {
    errorState = true;
    errorMsg = "This field is required.";
    return {
      eState: errorState,
      eMsg: errorMsg,
    };
  } else if (!streetRegex.test(value)) {
    errorState = true;
    errorMsg = "Invalid street name format.";
    return {
      eState: errorState,
      eMsg: errorMsg,
    };
  } else {
    errorState = false;
    return {
      eState: errorState,
      eMsg: "",
    };
  }
}

export const cityValidator = (value) => {
  let errorState = true;
  let errorMsg = "";
  const streetRegex = /^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]+$/;
  if (!value) {
    errorState = true;
    errorMsg = "This field is required.";
    return {
      eState: errorState,
      eMsg: errorMsg,
    };
  } else if (!streetRegex.test(value)) {
    errorState = true;
    errorMsg = "Invalid city format.";
    return {
      eState: errorState,
      eMsg: errorMsg,
    };
  } else {
    errorState = false;
    return {
      eState: errorState,
      eMsg: "",
    };
  }
}

export const passwordValidator = (values, errors) => {
  const minPasswordLength = 7;
  if (!values.password) {
    errors.password = "This field is required.";
  } else if (values.password.length < minPasswordLength) {
    errors.password = `Password must be at least ${minPasswordLength} characters long.`;
  }
};
