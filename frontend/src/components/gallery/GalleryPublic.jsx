import { useEffect, useState } from "react";

function GalleryPublic() {
  const [galleryPost, setGalleryPost] = useState(null);
  const GET_GALLERY = "http://localhost:5000/galleryposts/";

  useEffect(() => {
    fetch(GET_GALLERY)
      .then((response) => response.json())
      .then((result) => {
        setGalleryPost(result);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-6xl text-center mt-10 mb-10">Galleri</h1>

        <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:frid-cols-1 w-auto gap-3 items-center justify-center max-w-screen-xl">
          {galleryPost &&
            galleryPost.map((post) => (
              <li
                key={post.id}
                style={{ listStyle: "none" }}
                className="relative bg-cover bg-no-repeat rounden-lg bg-slate-50"
              >
                <h3 className="text-center font-bold text-textColor text-2xl mb-2 mt-5">
                  {post.title}
                </h3>
                <p className=" text-textColor text-xl md:mx-20 mb-10 sm:text-left">
                  {post.content}
                </p>
                {post.imagename && (
                  <a
                    href={post.imageurl}
                    target="_blank"
                    className="flex justify-center items-center rounded-t-lg "
                  >
                    <img
                      // max-w-80
                      src={post.imageurl}
                      alt="uppladdad bild som tillhör galleriet"
                      className=" mb-10 h-72"
                    />
                  </a>
                )}
              </li>
            ))}
        </div>
      </div>
    </>
  );
}

export default GalleryPublic;
