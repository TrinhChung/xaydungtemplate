import { SITE_NAME } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-4 text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} {SITE_NAME}</p>
    </footer>
  );
}
