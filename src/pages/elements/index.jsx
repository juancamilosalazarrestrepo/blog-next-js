import Layout from "../../components/Layout";
import UIComponentsLibrary from "../../components/UIComponentsLibrary";

const Elements = () => {
  return (
    <div className="">
      <main className="py-2 container mx-auto px-44 mt-1">
        <div className="w-full mt-20 mb-20">
          <UIComponentsLibrary />
        </div>
      </main>
    </div>
  );
};

export default function ElementsPage() {
  return (
    <Layout>
      <Elements />
    </Layout>
  );
}
