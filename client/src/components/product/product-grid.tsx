import ProductCard from "./product-card";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function ProductGrid({ products, title, icon, className = "" }: ProductGridProps) {
  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          {icon && <span className="text-primary mr-2">{icon}</span>}
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
