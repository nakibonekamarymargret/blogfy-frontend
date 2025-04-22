import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import CreatePost from "./components/posts/CreatePost";
import Posts from "./components/posts/Posts";
import ViewPost from "./components/posts/ViewPost";
import Navbar from "./components/Navbar";

// Layout component that conditionally shows the Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarOn = ["/", "/new", "/login", "/register"];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            {" "}
            <Home />{" "}
          </Layout>
        }
      />
      <Route
        path="/posts"
        element={
          <Layout>
            <Posts />
          </Layout>
        }
      />
      <Route
        path="/new"
        element={
          <Layout>
            <CreatePost />
          </Layout>
        }
      />
      
      <Route
        path="/login"
        element={
          <Layout>
            {" "}
            <Login />
          </Layout>
        }
      />

      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <Layout>
            <ViewPost />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
