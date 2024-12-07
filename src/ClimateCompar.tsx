import React, { useState } from "react";
import { Modal, Button, Paper } from "@mui/material/";

const ClimateComparison = () => {
  return (
    <div>
      <h1>지구온난화 1.5℃와 2.0℃ 주요 영향 비교</h1>
      <p>
        1.5℃와 2℃ 상승의 경우 모두 대부분 지역에서 평균 온도가 상승하고, 거주
        지역 대부분에서 극한의 고온 현상이 발생하며 일부 지역에서는 호우 및
        가뭄이 증가할 것으로 예상합니다.
      </p>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>구분</th>
            <th style={{ border: "1px solid black" }}>1.5℃</th>
            <th style={{ border: "1px solid black" }}>2.0℃</th>
            <th style={{ border: "1px solid black" }}>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black" }}>고유 생태계 및 인간계</td>
            <td style={{ border: "1px solid black" }}>높은 위험</td>
            <td style={{ border: "1px solid black" }}>매우 높은 위험</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>중위도 폭염일 온도</td>
            <td style={{ border: "1px solid black" }}>3℃ 상승</td>
            <td style={{ border: "1px solid black" }}>4℃ 상승</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>고위도 극한일 온도</td>
            <td style={{ border: "1px solid black" }}>4.5℃ 상승</td>
            <td style={{ border: "1px solid black" }}>6℃ 상승</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>산호 소멸</td>
            <td style={{ border: "1px solid black" }}>70~90%</td>
            <td style={{ border: "1px solid black" }}>99% 이상</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>육상생태계</td>
            <td style={{ border: "1px solid black" }}>중간 위험</td>
            <td style={{ border: "1px solid black" }}>높은 위험</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>
              서식지 절반 이상이 감소될 비율
            </td>
            <td style={{ border: "1px solid black" }}>
              곤충 6%, 식물 8%, 척추동물 4%
            </td>
            <td style={{ border: "1px solid black" }}>
              곤충 18%, 식물 16%, 척추동물 8%
            </td>
            <td style={{ border: "1px solid black" }}>2℃에서 두 배</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>
              다른 유형의 생태계로 전환되는 면적
            </td>
            <td style={{ border: "1px solid black" }}>6.5%</td>
            <td style={{ border: "1px solid black" }}>13.0%</td>
            <td style={{ border: "1px solid black" }}>2℃에서 두 배</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>대규모 특이 현상</td>
            <td style={{ border: "1px solid black" }}>중간 위험</td>
            <td style={{ border: "1px solid black" }}>중간-높은 위험</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>해수면 상승</td>
            <td style={{ border: "1px solid black" }}>0.26 - 0.77m</td>
            <td style={{ border: "1px solid black" }}>0.30 - 0.93m</td>
            <td style={{ border: "1px solid black" }}>
              약 10cm 차이. 인구 천만 명이 해수면 상승 위험에서 벗어남
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>
              북극 해빙 완전 소멸 빈도
            </td>
            <td style={{ border: "1px solid black" }}>
              100년에 한 번(복원 가능)
            </td>
            <td style={{ border: "1px solid black" }}>
              10년에 한 번(복원 어려움)
            </td>
            <td style={{ border: "1px solid black" }}>
              1.5℃ 초과 시 남극 해빙 및 그린란드 빙상 손실
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        이 외, 극한기상, 해양산성화, 생물다양성, 보건, 곡물 수확량, 어획량,
        경제성장 등에 관련된 위험(리스크) 모두 1.5℃보다 2℃ 온난화에서
        높음(수치적으로는 제시되어있지 않음).
      </p>
      <p>
        출처: "Special Report on Global Warming of 1.5 - Summary for
        Policymakers" (2018, IPCC)
      </p>
    </div>
  );
};

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>왜 1.5°C 일까요?</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 20, maxWidth: "90vh", overflow: "auto" }}>
          <div
            className="modal-content"
            style={{
              textAlign: "left",
            }}
          >
            <Button
              variant="contained"
              color="error"
              className="close-button"
              style={{ float: "right" }}
              onClick={() => setOpen(false)}
            >
              닫기
            </Button>
            <ClimateComparison />
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default App;
