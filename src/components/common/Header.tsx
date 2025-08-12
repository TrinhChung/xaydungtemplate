import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-100 p-4">
      <nav className="container mx-auto flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}
