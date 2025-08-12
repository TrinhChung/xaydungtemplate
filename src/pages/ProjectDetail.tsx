import { useParams } from 'react-router-dom';
import Seo from '@/components/common/Seo';

export default function ProjectDetail() {
  const { slug } = useParams();
  return (
    <div className="p-4">
      <Seo title={`Dự án ${slug}`} />
      <h1 className="text-2xl font-bold">Dự án {slug}</h1>
    </div>
  );
}
