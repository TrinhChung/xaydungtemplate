import { useParams } from 'react-router-dom';
import Seo from '@/components/common/Seo';

export default function ServiceDetail() {
  const { slug } = useParams();
  return (
    <div className="p-4">
      <Seo title={`Dịch vụ ${slug}`} />
      <h1 className="text-2xl font-bold">Dịch vụ {slug}</h1>
    </div>
  );
}
