import { useEffect, useState } from "react";

function BlogPublic() {
  const [blogPost, setBlogPost] = useState(null);
  const GET_BLOGS = "http://localhost:5000/posts/";

  useEffect(() => {
    fetch(GET_BLOGS)
      .then((response) => response.json())
      .then((result) => {
        setBlogPost(result);
      });
  }, []);

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif)$/.test(url);
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-6xl text-center">Blogg</h1>
        <div className=" space-y-16 m-5 flex flex-col mx-10 md:mx-20 lg:mx-52 roundend-lg gap-4">
          {blogPost &&
            blogPost.map((post) => (
              <li
                key={post.id}
                style={{ listStyle: "none" }}
                className=" flex flex-col rounded shadow-lg items-center"
              >
                <h3 className="text-center font-bold text-textColor text-2xl mb-10 mt-10">
                  {post.title}
                </h3>

                <div className="flex justify-center max-w-xl">
                  {isImage(post.fileurl) ? (
                    <a
                      href={post.fileurl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="w-full"
                        src={post.fileurl}
                        alt="Uppladdad bild som tillhör blogginlägget"
                      />
                    </a>
                  ) : (
                    <video controls>
                      <source src={post.fileurl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <p className="text-center text-textColor text-xl md:mx-20 mt-10 mb-10">
                  {post.content}
                </p>
              </li>
            ))}
        </div>
      </div>
    </>
  );
}

export default BlogPublic;
