import Layout from "../../components/Layout";
import UIComponentsLibrary from "../../components/UIComponentsLibrary";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
}

export default function ElementsPage() {
  return (
    <Layout>
      <Elements />
    </Layout>
  );
}
