import React, { useState } from "react";
import Chart1 from "./Chart1.tsx";
import Chart2 from "./Chart2.tsx";
import Chart3 from "./Chart3.tsx";
import DatePicker from "./DatePicker.tsx";
import { Button } from "@mui/material/";

function Analysis() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showChart, setShowChart] = useState(false);
  const handleStartDateChange = (newDate: Date) => {
    setStartDate(newDate);
  };
  const handleEndDateChange = (newDate: Date) => {
    setEndDate(newDate);
  };

  // 기후 변화 타이포그래피
  const ClimateChangeTypography = () => (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#fffbeb",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        marginBottom: "1rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#92400e",
          marginBottom: "0.75rem",
        }}
      >
        기후는 어떻게 악화되어 왔을까요?
      </h2>
      <p
        style={{
          color: "#92400e",
          lineHeight: "1.625",
        }}
      >
        기후 변화는 지구 역사상 가장 심각한 환경 도전 과제 중 하나입니다. 산업화
        이후 인간 활동으로 인한 온실가스 배출 증가, 극단적인 기후 현상 빈도
        상승, 생태계 파괴 등으로 인해 지구의 기후 시스템이 급격히 변화하고
        있습니다.
      </p>
    </div>
  );

  // 버튼 클릭 시 차트를 표시하도록 설정
  const handleButtonClick = () => {
    setShowChart(true);
  };

  return (
    <div>
      <ClimateChangeTypography />
      <div
        className="date-picker-container"
        style={{
          margin: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <DatePicker
          selectedDate={new Date()}
          onDateChange={handleStartDateChange}
          label={"시작 날짜"}
        />
        <DatePicker
          selectedDate={new Date()}
          onDateChange={handleEndDateChange}
          label={"종료 날짜"}
        />
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={handleButtonClick}
        >
          찾기
        </Button>
      </div>
      {showChart && (
        <div
          className="Chart"
          style={{
            justifyContent: "center",
            border: "1px solid",
            margin: "0 20px",
            maxWidth: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Chart1 startDate={startDate} endDate={endDate} />
        </div>
      )}
    </div>
  );
}

export default Analysis;
