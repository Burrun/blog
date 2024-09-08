import React, { useState } from "react";
import "./App.css";

function App() {
  let [post, setPost] = useState(["강남", "파이썬", "자바"]);
  let [rate, setRate] = useState([0, 0, 0]);
  let [modal, setModal] = useState(1);

  return (
    <div className="App">
      <div className="black-nav">
        <div>ReactBlog</div>
      </div>
      {post.map(function (a, i) {
        //a는 값 , i는 인덱스
        return (
          <div className="list" key={i}>
            <h4>
              {post[i]}
              <span
                onClick={() => {
                  let copy = [...rate];
                  copy[i] = copy[i] + 1;
                  setRate(copy);
                }}
              >
                👍
              </span>
              {rate[i]}
            </h4>
            <p>2월 17일 발행</p>
          </div>
        );
      })}
      {
        (modal = true ? (
          <Modal color={"yellow"} post={post} setPost={setPost} />
        ) : null)
      }
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal" style={{ background: props.color, padding: "20px" }}>
      <h4>{props.post}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button
        onClick={() => {
          let copy = [...props.post];
          copy[0] = "여자";
          props.setPost(copy);
        }}
      >
        글수정
      </button>
    </div>
  );
}

export default App;
