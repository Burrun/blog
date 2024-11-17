import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import {
  PageContainer,
  PageContainerToolbar,
} from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import { Article } from "./types";

const API_URL = "https://example.com"; // Flask 서버 URL로 변경

const NAVIGATION: Navigation = [
  {
    segment: "orders",
    title: "Orders",
    icon: <DashboardIcon />,
  },
];

const Skeleton = styled("div")<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  width: "100%",
}));

function PageToolbar() {
  return (
    <PageContainerToolbar>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon fontSize="inherit" />}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<PrintIcon fontSize="inherit" />}
        >
          Print
        </Button>
      </Stack>
    </PageContainerToolbar>
  );
}

function useCustomRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    }),
    [pathname]
  );

  return router;
}

async function fetchArticles() {
  const response = await fetch(`${API_URL}/article`);
  const data = await response.json();
  return data;
}

export default function NewsContainer() {
  const router = useCustomRouter("/orders");
  const theme = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      branding={{ title: "ACME Inc." }}
    >
      <Paper sx={{ p: 2, width: "100%" }}>
        <PageContainer slots={{ toolbar: PageToolbar }}>
          <Grid container spacing={2}>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Grid key={index}>
                    <Skeleton height={100} />
                  </Grid>
                ))
              : articles.map((article, index) => (
                  <Grid key={index}>
                    <Paper sx={{ p: 2 }}>
                      <h2>{article.title}</h2>
                      <p>{article.subtitle}</p>
                      <small>
                        By {article.author} on {article.date}
                      </small>
                    </Paper>
                  </Grid>
                ))}
          </Grid>
        </PageContainer>
      </Paper>
    </AppProvider>
  );
}
