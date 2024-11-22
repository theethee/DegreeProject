import BlogForm from "../components/blog/BlogForm";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

function HandleBlogPage() {
  return (
    <>
      <div className="mx-5 my-5 w-full">
        <Link to="/landing">
          <BsArrowLeft></BsArrowLeft>
        </Link>

      <div>
        <h1 className="text-6xl text-center">Hantera blogginlägg</h1>
        <BlogForm></BlogForm>
      </div>
      </div>
    </>
  );
}

// När du har loggat in ska du komma till landingpage

export default HandleBlogPage;
