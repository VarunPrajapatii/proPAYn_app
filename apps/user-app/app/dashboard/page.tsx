import Title1 from "../../components/Body/Title1";
import Title2 from "../../components/Body/Title2";
import Header from "../../components/Header/Header";



export default function Home() {
  return (
    <div>
      <Header/>
      <div className="pt-32">
        <Title1 />
      </div>
      <div>
        <Title2 />
      </div>
    </div>
  );
}
