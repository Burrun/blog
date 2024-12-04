import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { Article } from "./types";
import Modal from "@mui/material/Modal";

// const API_URL = "http://127.0.0.1:5000"; // 로컬 Flask 서버 URL

// async function fetchArticles() {
//   try {
//     const response = await fetch(`${API_URL}/article`);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     console.log("가져온 기사 목록:", data); // 데이터 출력
//     return data;
//   } catch (error) {
//     console.error("기사를 가져오는 중 오류 발생:", error);
//     return [];
//   }
// }

// async function fetchArticleContent(index: number) {
//   try {
//     const response = await fetch(`${API_URL}/article/${index}`);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     console.log(`${index}번 기사 전체 내용:`, data); // 개별 기사 데이터 출력
//     return data;
//   } catch (error) {
//     console.error("기사 내용을 가져오는 중 오류 발생:", error);
//     return null;
//   }
// }

// Mock function to simulate fetching articles
const fetchArticles = async (): Promise<Article[]> => {
  return [
    {
      title: "혁신의 미래: AI 기술의 현재와 전망",
      subtitle: "인공지능이 우리의 삶을 어떻게 변화시키고 있는가",
      author: "김테크 기자",
      date: "2024-03-15",
      content: null,
    },
    {
      title: "지속가능한 도시 건설: 환경과 기술의 조화",
      subtitle: "스마트 시티 프로젝트의 최신 트렌드",
      author: "박환경 기자",
      date: "2024-03-14",
      content: null,
    },
    {
      title: "글로벌 경제 전망: 2024년 주요 트렌드",
      subtitle: "불확실성 속에서 찾아보는 기회",
      author: "이경제 기자",
      date: "2024-03-13",
      content: null,
    },
  ];
};

// Mock function to simulate fetching full article content
const fetchArticleContent = async (
  index: number
): Promise<{ body: string } | null> => {
  const contents = [
    "AI 기술은 현대 사회의 혁신을 이끄는 핵심 동력입니다. 머신러닝, 딥러닝 등 첨단 기술들이 산업 전반에 걸쳐 혁명적인 변화를 가져오고 있으며, 의료, 교통, 교육 등 다양한 분야에서 혁신적인 솔루션을 제공하고 있습니다.",
    "스마트 시티 프로젝트는 도시 인프라와 첨단 기술을 결합하여 지속 가능한 도시 환경을 창출하는 혁신적인 접근법입니다. IoT 센서, 빅데이터 분석, 친환경 에너지 시스템 등을 통해 도시의 효율성과 삶의 질을 높이고 있습니다.",
    "2024년 글로벌 경제는 복합적인 도전과 기회로 가득합니다. 지정학적 긴장, 기술 혁신, 기후 변화 대응 등 다양한 요인들이 경제 흐름에 영향을 미치고 있으며, 기업들은 이러한 변화에 민첩하게 대응해야 합니다.",
  ];

  return index >= 0 && index < contents.length
    ? { body: contents[index] }
    : null;
};

export default function NewsContainer() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleOpen = async (article: Article, index: number) => {
    setOpen(true);
    const fullArticle = await fetchArticleContent(index);
    console.log("선택된 기사 전체 정보:", fullArticle); // 선택된 기사 정보 출력
    if (fullArticle) {
      setSelectedArticle({
        ...article,
        content: fullArticle.body,
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      try {
        console.log("기사 데이터 가져오기 시작");
        const data = await fetchArticles();
        setArticles(data);
        console.log("저장된 기사 목록:", data); // 저장된 데이터 출력
      } catch (error) {
        console.error("기사를 가져오는 중 오류 발생:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  return (
    <Paper sx={{ p: 2, width: "100%" }}>
      <Grid container spacing={2}>
        {articles.map((article, index) => (
          <Paper
            sx={{ p: 3 }}
            key={index}
            onClick={() => handleOpen(article, index)}
          >
            <h2>{article.title}</h2>
            <p>{article.subtitle}</p>

            <small>
              By {article.author} on {article.date}
            </small>
          </Paper>
        ))}
      </Grid>

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
        <Paper sx={{ p: 30, maxWidth: "90vh", overflow: "auto" }}>
          <div
            style={{
              textAlign: "left",
            }}
          >
            {selectedArticle && (
              <>
                <h1 id="article-title">{selectedArticle.title}</h1>
                <h2 id="article-content">{selectedArticle.subtitle}</h2>
                <p id="article-content">{selectedArticle.content}</p>
                <small>
                  By {selectedArticle.author} on {selectedArticle.date}
                </small>
              </>
            )}
          </div>
        </Paper>
      </Modal>
    </Paper>
  );
}
