import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
// import NavigationLinks from "./components/navbar/NavigationLinks";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HandleBlogPage from "./pages/HandleBlogPage";
import HandleGalleryPage from "./pages/HandleGalleryPage";


function Root() {
  return (
    <>
      <nav>{/* <NavigationLinks></NavigationLinks> */}</nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <HomePage />, path: "/" },
        { element: <GalleryPage />, path: "/gallery" },
        { element: <BlogPage />, path: "/blog" },
        { element: <LoginPage />, path: "/login" },
        { element: <LandingPage />, path: "/landing" },
        { element: <HandleBlogPage />, path: "/handleBlog" },
        { element: <HandleGalleryPage />, path: "/handleGallery" },

      ],
      element: <Root />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
