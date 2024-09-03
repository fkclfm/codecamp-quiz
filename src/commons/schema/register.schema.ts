import * as yup from "yup";

export const schema = yup.object({
  writer: yup
    .string()
    .max(5, "작성자를 5글자 이내 문자열입니다.")
    .required("작성자를 입력해주세요."),
  password: yup
    .string()
    .min(4, "비밀번호는 최소 4자리 이상입니다.")
    .max(8, "최대 8자리 까지 설정할 수 있습니다.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[\d])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{4,8}$/,
    )
    .required("비밀번호를 작성해주세요."),
  title: yup
    .string()
    .max(100, "최대 100자리 까지 입력할 수 있습니다.")
    .required("제목을 입력해주세요."),
  contents: yup
    .string()
    .max(1000, "최대 1000자리 까지 설정할 수 있습니다.")
    .required("내용을 입력해주세요."),
});
