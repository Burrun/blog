import React, { useState } from "react";
import Chart1 from "./Chart1.tsx";
import { yellow } from "@mui/material/colors";
function Analysis() {
  return (
    <div style={{ border: "2px solid #ffd700" }}>
      <Chart1 />
    </div>
  );
}

export default Analysis;
