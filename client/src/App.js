import {
  BrowserRouter,
  // Navigate, 
  Routes,
  Route
} from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
// import ProfilePage from 'scenes/profilePage';
import BlogPage from 'scenes/blogPage';
import PostsPage from 'scenes/postsPage';
import EditPage from 'scenes/editPage';
import CreateBlogPage from 'scenes/createBlogPage';
import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/blog/:blogId"
              element={<BlogPage />}
            />
            <Route
              path="/posts"
              element={<PostsPage />}
            />
            <Route
              path="/edit/:blogId"
              element={<EditPage />}
            />
            <Route
              path="/create"
              element={<CreateBlogPage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
