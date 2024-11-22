import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { useState } from "react";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onLogin = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Login successful:", responseData);
        navigate("/landing");
      } else {
        throw new Error("Failed to log in");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <section className="flex  flex-col w-full items-center ">
        <form
          className="flex flex-col w-5/12 h-auto my-16 bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onLogin)}
        >
          <h1 className="text-6xl text-center my-10">Logga in som admin</h1>
          <label>Användarnamn</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("username", {
              required: "Vänligen fyll i användarnamn",
            })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <label>Lösenord</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-3"
            type="password"
            {...register("password", { required: "Vänligen fyll i lösenord" })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button className=" rounded bg-slate-600 font-bold text-gray-100  hover:text-gray-300 w-full py-2 px-3">
            Logga in
          </button>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
