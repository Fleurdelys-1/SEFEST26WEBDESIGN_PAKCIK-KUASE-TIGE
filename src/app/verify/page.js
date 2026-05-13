import Validation from '../../components/validation';

export default async function VerifyPage({ searchParams }) {
  const params = await searchParams;
  const verifyValue = params?.verify ?? params?.id ?? '';
  const initialTab = verifyValue ? 'qr' : 'manual';

  return <Validation initialTab={initialTab} initialQueryValue={verifyValue} />;
}
