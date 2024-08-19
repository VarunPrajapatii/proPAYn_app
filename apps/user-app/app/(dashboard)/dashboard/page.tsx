import Title1 from "../../../components/Body/Title1";
import Title2 from "../../../components/Body/Title2";
import Title3 from "../../../components/Body/Title3";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";



export default function Home() {
  return (
    <div className="scrollbar-hide">
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
  );
}
