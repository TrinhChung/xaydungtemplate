import { useParams } from 'react-router-dom';
import Seo from '@/components/common/Seo';

export default function PostDetail() {
  const { slug } = useParams();
  return (
    <div className="p-4">
      <Seo title={`Tin tức ${slug}`} />
      <h1 className="text-2xl font-bold">Tin tức {slug}</h1>
    </div>
  );
}
