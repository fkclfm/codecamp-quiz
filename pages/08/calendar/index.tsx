import React, { useState } from "react";
import { Calendar, theme } from "antd";
import type { CalendarProps } from "antd";
import { Dayjs } from "dayjs";

export default function App() {
  const { token } = theme.useToken();
  const [selectday, setSelectDay] = useState<Dayjs | null>(null);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
    console.log(value);
  };

  const onSelectDay = (value: Dayjs) => {
    setSelectDay(value);
  };
  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <>
      <div style={wrapperStyle}>
        <Calendar
          fullscreen={false}
          onPanelChange={onPanelChange}
          onSelect={onSelectDay}
        />
      </div>
      <span>
        {selectday ? selectday.format("MM") : "날짜를 다시 입력해주세요."}
      </span>
    </>
  );
}
