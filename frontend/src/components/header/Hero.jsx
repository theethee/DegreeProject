import headerImg from "../../assets/hero/header_img.jpg";

const Hero = () => {
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="top-0 left-0 w-full h-screen object-cover"
          src={headerImg}
          alt="Hero img"
        />
        <div className="bg-black absolute top-0 left-0 w-full h-screen opacity-30"></div>

        <div className="absolute top-0 w-full h-full flex flex-col justify-center text-white">
          {/* <div className="md: left-[10%] max-w-[1100px] m-auto absolute p-4 ">
            <p>All inclusive</p>
            <h1 className="font-bold text-5xl md:text-7xl drop-shadow-2xl">Private Beaches & Getaway</h1>
            <p className="max-w-[600px] drop-shadow-2xl py-2 text-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit in
              dicta possimus reprehenderit architecto eveniet, enim earum velit
              aliquam quaerat, atque alias. Vero eligendi sequi nesciunt maxime,
              quo delectus obcaecati alias fuga consectetur tempora voluptas,
              blanditiis iusto repudiandae, molestiae repellendus!
            </p>
            <button className="bg-white text-black">Reserve now</button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Hero;
