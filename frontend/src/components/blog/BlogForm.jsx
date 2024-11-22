import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function BlogForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [postIdToUpdate, setPostIdToUpdate] = useState(null);
  const [blogPost, setBlogPost] = useState([]);

  // const [blogError, setBloggError] = useState("");

  const uploadURL = "http://localhost:5000/posts/";

  useEffect(() => {
    fetch(uploadURL)
      .then((response) => response.json())
      .then((result) => {
        setBlogPost(result);
      });
  }, []);

  const handleCreateBlog = async (data) => {
    try {
      console.log("title: ", data.title);
      console.log("content: ", data.content);
      console.log("file: ", data.file);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("file", data.file[0]); //lägger till filen

      console.log("formData", formData);
      const postResponse = await fetch(uploadURL, {
        method: "POST",
        body: formData,
      });

      if (postResponse.ok) {
        reset();
        // Ladda om sidan
        window.location.reload();
      } else {
        throw new Error("Failed to create blog post");
      }

      const postResult = await postResponse.json();

      console.log("postResult", postResult);
    } catch (error) {
      console.error("Error creating blog post", error);
    }
  };

  // -----------------------------------------------------

  const handleUpdateBlog = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("file", data.file[0]);

      const updateURL = `${uploadURL}${postIdToUpdate}`; // URL för att uppdatera specifikt blogginlägg

      const updateResponse = await fetch(updateURL, {
        method: "PUT",
        body: formData,
      });

      if (updateResponse.ok) {
        reset();
        // Återställ postIdToUpdate
        setPostIdToUpdate(null);
        // Ladda om sidan
        window.location.reload();
      } else {
        throw new Error("Failed to update blog post");
      }

      const updatedPost = await updateResponse.json();

      console.log("Updated post", updatedPost);
    } catch (error) {
      console.error("Error updating blog post", error);
    }
  };

  const handleEdit = (id) => {
    const postToUpdate = blogPost.find((post) => post.id === id);
    setPostIdToUpdate(postToUpdate.id);
    setValue("title", postToUpdate.title);
    setValue("content", postToUpdate.content);
    // setValue(null);
  };
  // -----------------------------------------------------

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await fetch(`${uploadURL}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (deleteResponse.ok) {
        // Ladda om sidan
        window.location.reload();
      } else {
        throw new Error("Failed to delete blog post");
      }

      const data = await deleteResponse.json();
      console.log(data);
    } catch (error) {
      console.error("Error deleting blog post", error);
    }
  };

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif)$/.test(url);
  };

  return (
    <>
      <section className="flex flex-col gap-4">
        <form
          className="flex flex-col lg:w-1/2 md:w-1/2 sm:w-1/2 self-center gap-4 shadow-lg p-4 my-8 bg-slate-100"
          onSubmit={handleSubmit(
            postIdToUpdate ? handleUpdateBlog : handleCreateBlog
          )}
        >
          <h1>
            {postIdToUpdate ? "Uppdater blogginlägg" : "Skapa blogginlägg"}
          </h1>
          <textarea
            placeholder="Rubrik"
            {...register("title", {
              required: "Vänligen skapa en rubrik",
            })}
          ></textarea>
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
          <textarea
            placeholder="Skriv ditt blogginlägg här"
            style={{ marginBottom: "10px", marginTop: "10px" }}
            className="h-40"
            {...register("content", {
              required: "Vänligen fyll i textinnehåll",
            })}
          ></textarea>
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
          <input type="file" {...register("file", { required: true })} />
          <button
            className="border border-slate-400 rounded-md py-0.5 hover:bg-amber-400"
            type="submit"
          >
            {postIdToUpdate ? "Uppdatera inlägg" : "Posta inlägg"}
          </button>{" "}
        </form>

        <div className=" space-y-16 m-5 flex flex-col mx-10 md:mx-20 lg:mx-52 roundend-lg">
          {blogPost.map((post) => (
            <li
              key={post.id}
              style={{ listStyle: "none" }}
              className=" flex flex-col rounded shadow-lg items-center"
            >
              <h3 className="text-center font-bold text-textColor text-2xl mb-5 mt-5">
                {post.title}
              </h3>

              <div className="flex max-w-xl">
                {isImage(post.fileurl) ? (
                  <a
                    href={post.fileurl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
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
              <p className="text-center text-textColor text-xl md:mx-20 mt-5">
                {post.content}
              </p>
              <div className="flex justify-center text-textColor mt-5 mb-10">
                <button
                  style={{ marginRight: "5px" }}
                  className="font-bold border border-slate-300 hover:border-slate-400"
                  onClick={() => handleDelete(post.id)}
                >
                  Radera
                </button>
                <button
                  className="font-bold border border-slate-300 hover:border-slate-400"
                  onClick={() => handleEdit(post.id)}
                >
                  Ändra
                </button>
              </div>
            </li>
          ))}
        </div>
      </section>
    </>
  );
}

export default BlogForm;
