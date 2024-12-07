import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import Analysis from "./Analysis.tsx";
import News from "./News.tsx";
import Forcast from "./Forcast.tsx";
import "./App.css";

function App() {
  let [locations, setLocations] = useState(["서울", "대전", "대구"]);
  let [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <Router>
      <div className="Web">
        <div className="nav">
          <div style={{ border: "1px solid" }}>
            <Typography variant="h3">myWeather</Typography>
          </div>
          <div className="tab">
            <ButtonGroup
              variant="outlined"
              aria-label="Basic button group"
              color="success"
            >
              <Button component={Link} to="/forcast">
                예보
              </Button>
              <Button component={Link} to="/analysis">
                날씨 분석
              </Button>
              <Button component={Link} to="/news">
                기사
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <Autocomplete
              disablePortal
              options={locations}
              sx={{ width: 200 }}
              value={selectedLocation}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") setSelectedLocation(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="위치 검색" />
              )}
            />
          </div>
        </div>

        <div className="Fontent">
          <Routes>
            <Route path="/" element={<Navigate to="/forcast" />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/news" element={<News />} />
            <Route
              path="/forcast"
              element={<Forcast location={selectedLocation} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
