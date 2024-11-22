import Home from "../components/home/Home";
import Teaser from "../components/home/Teaser";
import NavigationBar from "../components/navbar/NavigationBar";

function HomePage() {
  return (
    <>
      <div>
        <NavigationBar></NavigationBar>
        <Home></Home>
        <Teaser></Teaser>
      </div>
    </>
  );
}

export default HomePage;
