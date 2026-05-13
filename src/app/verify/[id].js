import Validation from '../../../components/validation';

export default function VerifyIdPage({ params }) {
  return <Validation initialTab='qr' initialQueryValue={params?.id ?? ''} />;
}

