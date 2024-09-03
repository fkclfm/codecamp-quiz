import { atom } from "recoil";

export const isEdit = atom({
  key: "isEdit",
  default: true,
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});
