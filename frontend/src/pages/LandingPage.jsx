import { Link } from "react-router-dom";


function NavigationInLanding() {
  return (
    <ul className="flex flex-row fixed w-full  items-center justify-center ">
      <li className="font-bold text-3xl p-8">
        <Link to="/handleBlog">Blogg</Link>
      </li>
      <li className="font-bold text-3xl p-8">
        <Link to="/handleGallery">Galleri</Link>
      </li>
    </ul>
  );
}

function LogoutNavigation(){
  return(
    <ul className="flex my-40  items-center justify-center">
      <li className="font-bold text-3xl p-8">
        <Link to="/">Logga ut</Link>
      </li>
    </ul>
  )
}

function LandingPage() {

  return (
    <>
      <div>
        <h1 className="text-6xl text-center">Välkommen admin!</h1>
        <p className="text-center mt-2 text-2xl p-8">
          Här kan du välja att skapa, redigera, eller ta bort blogginlägg och
          galleri
        </p>
      </div>
      <NavigationInLanding />
    <LogoutNavigation></LogoutNavigation>
    </>
  );
}

// När du har loggat in ska du komma till landingpage

export default LandingPage;
