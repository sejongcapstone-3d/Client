function checkEmail(email) {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (regExp.test(email) === false) {
    return { isValid: false, message: '올바른 이메일 정보를 입력해 주세요' };
  }
  // 중복확인 요청

  return { isValid: true, message: '' };
}

function checkPassword(password) {
  const check = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (check.test(password) === false) {
    if (regExp.test(password)) return { isValid: true, message: '' };
    return { isValid: false, message: '보안을 위해 최소 8자 문자, 숫자를 조합해주세요.' };
  }

  return { isValid: true, message: '' };
}

function checkNickname(nickname) {
  // let check = /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/ ]/;
  let check = /^[a-zA-Z가-힣0-9]*$/;
  if (!check.test(nickname)) {
    return { isValid: false, message: '올바르지 않은 입력입니다' };
  }
  check = /^.{2,8}$/;
  if (check.test(nickname) === false) {
    return { isValid: false, message: '2글자 이상 8글자 이하여야 합니다' };
  }
  //  중복확인 요청
  return { isValid: true, message: '' };
}

function checkBuisnessName(buisnessName) {
  // let check = /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/ ]/;
  let check = /^[a-zA-Z가-힣0-9]*$/;
  if (!check.test(buisnessName)) {
    return { isValid: false, message: '올바르지 않은 입력입니다' };
  }
  check = /^.{1,16}$/;
  if (check.test(buisnessName) === false) {
    return { isValid: false, message: '1글자 이상 16글자 이하여야 합니다' };
  }
  //  중복확인 요청
  return { isValid: true, message: '' };
}

function checkPhone(phone){
  let check = /^\d{3}-\d{3,4}-\d{4}$/;
  if (!check.test(phone)) {
    return { isValid: false, message: '올바르지 않은 입력입니다' };
  }
  //  중복확인 요청
  return { isValid: true, message: '' };
}

export {checkEmail, checkPassword, checkNickname, checkBuisnessName, checkPhone};
