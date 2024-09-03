import { ChangeEvent, useState } from "react";

export default function DateComponent() {
  const [date, setDate] = useState("");
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (value.length > 4) {
      setDate;
    }
  };

  return (
    <div>
      <input type="text" onChange={onChangeText} />
    </div>
  );
}
