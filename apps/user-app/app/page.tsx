import Title1 from "../components/Landing/Title1";
import Title2 from "../components/Landing/Title2";
import Title3 from "../components/Landing/Title3";
import Footer from "../components/Footer/Footer";

export default async function LandingPage() {
  return (
    <div className="scrollbar-hide scroll-smooth">
        <div className="">
          <Title1 />
        </div>
        <div>
          <Title2 />
        </div>
        <div>
          <Title3 />
        </div>
        <div>
          <Footer/>
        </div>
    </div>
  )
}