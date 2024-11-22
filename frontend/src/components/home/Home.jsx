import headerImg from "../../assets/home/header.jpg";

const Home = () => {
  return (
    <>
      {/* <div className="w-full h-screen">
        <img
          className="top-0 left-0 w-full h-screen object cover"
          src={headerImg}
          alt="header image"
        />
        <div className="bg-black absolute top-0 left-0 w-full h-screen opacity-30"></div>
        <div>
          <h1 className="font-bold md:text-7xl drop-shadow-2xl text-textColor text-9xl text-center">
            Bärnstensdokumentär
          </h1>
        </div>
      </div> */}
      <div className="w-full h-screen">
        <img
          className="top-0 left-0 w-full h-screen object-cover"
          src={headerImg}
          alt="Hero img"
        />
        <div className="absolute top-0 left-0 w-full h-screen opacity-30"></div>

        <div className="absolute top-0 w-full h-full flex flex-col justify-center text-white">
          <div className="md: left-[10%] max-w-[1100px] m-auto absolute p-4 ">
            {/* <p>All inclusive</p> */}
            <h1 className="font-bold text-5xl md:text-7xl drop-shadow-2xl">
              När tiden stannar - en Bärnstens dokumentär
            </h1>
            <p className="max-w-[600px] drop-shadow-2xl py-2 text-xl">
              Följ med på en fascinerande resa längs Falsterbos stränder i vår
              kommande dokumentär, När tiden stannar. Upptäck de gyllene
              skatterna som gömmer sig under sanden och hör berättelserna från
              passionerade bärnstenssökare som delar sina hemligheter och fynd.
              Med spektakulära bilder och spännande insikter avslöjar vi
              skönheten och mystiken bakom Falsterbos bärnsten. Missa inte
              premiären - en visuell upplevelse som kommer att förtrolla och
              inspirera!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
