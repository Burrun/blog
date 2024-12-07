import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  label: String;
}

export default function DatePicker({
  selectedDate,
  onDateChange,
  label,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <MuiDatePicker
          label={label}
          value={dayjs(selectedDate)}
          onChange={(newValue) => {
            if (newValue) {
              onDateChange(newValue.toDate());
            }
          }}
          minDate={dayjs("2000-01-01")}
          maxDate={dayjs()}
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
            height: "50px", // 전체 높이 조절
            "& .MuiInputBase-root": {
              height: "40px", // 입력 필드 높이 조절
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
