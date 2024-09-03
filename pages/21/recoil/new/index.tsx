import { useRecoilState } from "recoil";
import Write from "../../../../src/components/units/example/write/WriteContainer";
import { isEdit } from "../../../../src/commons/stores/globalState";

export default function RecoilTest() {
  const [RecoilisEdit, setRecoilIsEdit] = useRecoilState(isEdit);
  setRecoilIsEdit(false);
  return <div>{RecoilisEdit === false && <Write />}</div>;
}
