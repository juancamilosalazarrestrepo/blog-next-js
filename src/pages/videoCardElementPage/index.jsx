
import Layout from "../../components/Layout";
import VideoCardComponent from "../../components/VideoCardComponent";

const VideoCardElementPage = () => {


  return (
    <div className="">
      <main>
        <div className="w-full">
          <VideoCardComponent />
        </div>
      </main>
    </div>
  );
};



export default function BlogTemplate() {
  return (
    <Layout>
      <VideoCardElementPage />
    </Layout>
  );
}
