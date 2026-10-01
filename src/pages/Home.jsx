import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/layout/Footer";
import backgroundImage from "../assets/06f7bc1e9f870646b97d066ab6cd2e97.jpg";
import "./Home.css";

function Home() {
  return (
    <main
      className="home"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
       <Hero />
       <Footer />
    </main>
  );
}

export default Home;