import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function GalleryForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [galleryPost, setGalleryPost] = useState([]);
  const [galleryIdToUpdate, setGalleryIdToUpdate] = useState(null);

  const BASE_URL = "http://localhost:5000/galleryposts/";

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((result) => {
        console.log("Fetched gallery posts:", result);
        setGalleryPost(result);
      });
  }, []);

  const handleCreateGalleryPosts = async (data) => {
    try {
      console.log("title: ", data.title);
      console.log("content: ", data.content);
      console.log("selected image: ", data.file);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("file", data.file[0]); //lägger till filen

      console.log("formData", formData);
      const postResponse = await fetch(BASE_URL, {
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
      console.error("Error creating gallery post", error);
    }
  };

  // --------------------

  const handleUpdateGallery = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("file", data.file[0]);

      const updateURL = `${BASE_URL}${galleryIdToUpdate}`; // URL för att uppdatera specifikt blogginlägg

      const updateResponse = await fetch(updateURL, {
        method: "PUT",
        body: formData,
      });

      if (updateResponse.ok) {
        reset();
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
    const postToUpdate = galleryPost.find((post) => post.id === id);
    setGalleryIdToUpdate(postToUpdate.id);
    setValue("title", postToUpdate.title);
    setValue("content", postToUpdate.content);
  };

  // -------------------

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await fetch(`${BASE_URL}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (deleteResponse.ok) {
        // Ladda om sidan
        window.location.reload();
      } else {
        throw new Error("Failed to delete gallery post");
      }

      const data = await deleteResponse.json();
      console.log(data);
    } catch (error) {
      console.error("Error deleting gallery  post", error);
    }
  };

  // -----------------------

  return (
    <>
      {/* <div>
        <h1 className="text-6xl text-center">Galleri formulär</h1>
      </div> */}
      <section className="flex flex-col items-center justify-center gap-4 max-w-full overflow-auto">
        <form
          className="flex flex-col self-center gap-4 shadow-lg p-4 my-8 bg-slate-100"
          onSubmit={handleSubmit(
            galleryIdToUpdate ? handleUpdateGallery : handleCreateGalleryPosts
          )}
        >
          <h1>Lägg till i galleriet</h1>
          <textarea
            placeholder="Rubrik"
            {...register("title", { required: "Vänligen skapa en rubrik" })}
          ></textarea>
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
          <textarea
            placeholder="Beskrivning"
            {...register("content", {
              required: "Vänligen fyll i textinnehåll",
            })}
            style={{ marginBottom: "10px", marginTop: "10px" }}
            className="h-40"
          ></textarea>
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
          <input
            type="file"
            {...register("file", { required: "Vänligen ladda upp en bild" })}
          />
          {errors.file && <p className="text-red-500">{errors.file.message}</p>}
          <button
            className="border border-slate-400 rounded-md py-0.5 hover:bg-amber-400"
            type="submit"
          >
            {galleryIdToUpdate ? "Uppdatera inlägg" : "Posta inlägg"}
          </button>{" "}
        </form>

        <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 w-auto gap-3 items-center justify-center max-w-screen-xl">
          {galleryPost.map((post) => (
            <li
              key={post.id}
              style={{ listStyle: "none" }}
              className="relative  bg-cover bg-no-repeat rounden-lg bg-slate-50"
            >
              <h3 className="text-center font-bold text-textColor text-2xl mb-2 mt-5">
                {post.title}
              </h3>

              <p className="text-center text-textColor text-xl md:mx-20 mt-5 mb-5">
                {post.content}
              </p>
              {post.imagename && (
                <a
                  href={post.imageurl}
                  target="_blank"
                  className="flex justify-center rounded-t-lg w-full"
                >
                  <img
                    src={post.imageurl}
                    alt="uppladdad bild som tillhör galleriet"
                    className="mb-10 h-72"
                  />
                </a>
              )}

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

export default GalleryForm;
