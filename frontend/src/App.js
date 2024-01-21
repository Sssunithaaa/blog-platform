import "./App.css";
import Homepage from "./pages/home/Homepage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ArticleDetail from "./pages/container/ArticleDetail";
import RegisterPage from "./pages/register/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginForm from "./pages/login/Login";
import ProfilePage from "./pages/profile/profilePage";
import ArticleCardSkeleton from "./Components/ArticleCardSkeleton";
import AdminLayout from "./pages/Admin/AdminLayout";
import Admin from "./pages/Admin/Screens/Admin";
import Comments from "./pages/Admin/Screens/comments/Comments";
import NewPost from "./pages/Admin/Screens/Posts/NewPost";
import ManagePosts from "./pages/Admin/Screens/Posts/ManagePosts";
import CreatePost from "./Components/CreatePost";
import UserPosts from "./pages/container/UserPosts";
function App() {
  return (
    <div className="font-sans">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/blog/:slug" element={<ArticleDetail />} />
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/create" element={<CreatePost />}></Route>
          <Route path="/posts" element={<UserPosts />}></Route>
          {/*<Route path="/editor" element={<Tiptap/>}></Route> */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />}></Route>
            <Route path="comments" element={<Comments />}></Route>
            <Route path="posts/new" element={<NewPost />}></Route>
            <Route path="posts/manage" element={<ManagePosts />}></Route>
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
