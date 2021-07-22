const validatePass = password => {
  const regExp = new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/);
  if (regExp.test(password)) {
    return true;
  }
  return false;
};

module.exports = validatePass;
