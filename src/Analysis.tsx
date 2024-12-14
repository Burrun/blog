import React, { useState } from "react";
import Chart1 from "./Chart1.tsx";
import Chart2 from "./Chart2.tsx";
import Chart3 from "./Chart3.tsx";
import DatePicker from "./DatePicker.tsx";
import { Button } from "@mui/material/";

function Analysis() {
  const [startDate, setStartDate] = useState<Date>(new Date("2001-01-01"));
  const [endDate, setEndDate] = useState<Date>(new Date("2001-01-01"));
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
    if (startDate && endDate) {
      setShowChart(true); // 날짜가 모두 설정되면 차트를 표시
    } else {
      setShowChart(false); // 날짜가 설정되지 않으면 차트를 표시하지 않음
      alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
    }
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
          selectedDate={startDate}
          onDateChange={handleStartDateChange}
          label={"시작 날짜"}
        />
        <DatePicker
          selectedDate={endDate}
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
      {startDate && endDate && showChart && (
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
          <Chart2 startDate={startDate} endDate={endDate} />
        </div>
      )}
    </div>
  );
}

export default Analysis;
