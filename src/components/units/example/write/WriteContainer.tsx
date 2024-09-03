import { useRecoilState } from "recoil";
import { isEdit } from "../../../../commons/stores/globalState";

export default function Write() {
  const [RecoilIsEdit, setRecoilIsEdit] = useRecoilState(isEdit);
  return <h1>{RecoilIsEdit ? "수정하기" : "등록하기"}</h1>;
}
