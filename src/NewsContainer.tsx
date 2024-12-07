import React, { useState, useEffect } from "react";
import { Article } from "./types";
import { Button, ButtonGroup, Modal, Paper, Stack } from "@mui/material";

export default function NewsContainer() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  //모든 기사 가져오기
  const fetchArticles = async () => {
    try {
      const res = await fetch("http://localhost:8080/article");
      const jsn = await res.json();
      setArticles(jsn);
      console.log("jsn 구성 파일입니다 \n", jsn);
      return jsn;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // 개별 기사 가져오기
  const fetchSingleArticle = async (i) => {
    try {
      const res = await fetch(`http://localhost:8080/article/${i}`);
      const jsn = await res.json();
      setSelectedArticle(jsn);
      return jsn;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // 기사 목록 로드
  const loadArticles = async () => {
    setLoading(true);
    const articles = await fetchArticles();
    setArticles(articles);
    setLoading(false);
  };

  // 모달 열기 및 개별 기사 로드
  const handleOpen = async (index) => {
    setOpen(true);
    const fullArticle = await fetchSingleArticle(index);
    if (fullArticle) {
      setSelectedArticle(fullArticle);
    }
  };

  //모달 닫기
  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div>
      <div className="tag" style={{ padding: "5px" }}>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" color="success">
            원문 보기{" "}
          </Button>
          <Button variant="outlined" color="success">
            번역본 보기
          </Button>
          <Button variant="outlined" color="success">
            갱신하기
          </Button>
        </Stack>
      </div>
      <Stack spacing={3}>
        {articles.map((article, index) => (
          <Paper sx={{ p: 3 }} key={index} onClick={() => handleOpen(index)}>
            <h2>{article.title}</h2>
            <p>{article.subtitle}</p>

            <small>
              By {article.author} on {article.date}
            </small>
          </Paper>
        ))}
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="article-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{ p: 30, maxWidth: "90vh", maxHeight: "80vh", overflow: "auto" }}
        >
          <Button
            className="close-button"
            variant="contained"
            color="error"
            style={{ float: "right" }}
            onClick={() => setOpen(false)}
          >
            닫기
          </Button>
          <div
            style={{
              textAlign: "left",
            }}
          >
            {selectedArticle && (
              <>
                <h1 id="article-title">{selectedArticle.title}</h1>
                <h2 id="article-content" style={{ whiteSpace: "pre-wrap" }}>
                  {selectedArticle.subtitle}
                </h2>
                <p id="article-content" style={{ whiteSpace: "pre-wrap" }}>
                  {selectedArticle.body}
                </p>
                <small>
                  By {selectedArticle.author} on {selectedArticle.date}
                </small>
              </>
            )}
          </div>
        </Paper>
      </Modal>
    </div>
  );
}
