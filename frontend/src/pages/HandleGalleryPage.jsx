import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import GalleryForm from "../components/gallery/GalleryForm";

function HandleGalleryPage() {
  return (
    <>
      <div className="mx-5 my-5 w-full">
        <Link to="/landing">
          <BsArrowLeft></BsArrowLeft>
        </Link>

      <div>
        <h1 className="text-6xl text-center">Hantera galleriet</h1>
        <GalleryForm></GalleryForm>
      </div>
      </div>
    </>

  );
}

// När du har loggat in ska du komma till landingpage

export default HandleGalleryPage;
