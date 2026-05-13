import Home from '../components/home';
import Validation from '../components/validation';
import About from '../components/about';
import FAQ from '../components/faq';
import Contact from '../components/contact';

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const verifyValue = params?.verify ?? params?.id ?? '';
  const initialTab = verifyValue ? 'qr' : 'manual';

  return (
    <>
      <Home />
      <Validation initialTab={initialTab} initialQueryValue={verifyValue} />
      <About />
      <FAQ />
      <Contact />
    </>
  );
}
