import { Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
}

export default function MobileMenu({ isOpen }: MobileMenuProps) {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-white dark:bg-secondary border-t dark:border-gray-700">
      <div className="container mx-auto px-4 py-2">
        <nav className="flex flex-col space-y-3 py-3">
          <Link href="/" className="text-secondary dark:text-white hover:text-primary font-medium py-2">
            Home
          </Link>
          <Link href="/category/manga" className="text-secondary dark:text-white hover:text-primary font-medium py-2">
            Manga
          </Link>
          <Link href="/category/figure" className="text-secondary dark:text-white hover:text-primary font-medium py-2">
            Figures
          </Link>
          <Link href="/category/snack" className="text-secondary dark:text-white hover:text-primary font-medium py-2">
            Snacks
          </Link>
        </nav>
      </div>
    </div>
  );
}
