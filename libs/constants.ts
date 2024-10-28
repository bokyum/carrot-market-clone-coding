export const REGEX = {
  PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
  USERNAME: /^[a-zA-Z0-9_]+$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const UserValidation = {
  username: {
    minLength: 2,
    maxLength: 10,
    regex: REGEX.USERNAME,
    errors: {
      required: "사용자 이름은 필수 입력 사항입니다.",
      type: "사용자 이름은 문자열이어야 합니다.",
      min: "사용자 이름은 최소 2자 이상이어야 합니다.",
      max: "사용자 이름은 최대 10자 이하여야 합니다.",
      pattern: "사용자 이름은 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.",
      duplicate: "사용자 이름이 이미 존재합니다.",
    },
  },
  email: {
    regex: REGEX.EMAIL,
    errors: {
      required: "이메일은 필수 입력 사항입니다.",
      type: "이메일은 문자열이어야 합니다.",
      pattern: "이메일 형식이 올바르지 않습니다.",
      duplicate: "이메일이 이미 존재합니다.",
    },
  },
  password: {
    minLength: 10,
    regex: REGEX.PASSWORD,
    errors: {
      required: "비밀번호는 필수 입력 사항입니다.",
      type: "비밀번호는 문자열이어야 합니다.",
      min: "비밀번호는 최소 10자 이상이어야 합니다.",
      pattern:
        "비밀번호는 대문자, 소문자, 숫자, 특수문자(#?!@$%^&*-)를 포함해야 합니다.",
    },
  },
  confirmPassword: {
    minLength: 10,
    regex: REGEX.PASSWORD,
    errors: {
      match: "비밀번호가 일치하지 않습니다.",
    },
  },
};
