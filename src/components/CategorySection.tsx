import { ArrowRight } from 'lucide-react';
import type { Category } from '../lib/types';

interface CategorySectionProps {
  categories: Category[];
  onCategoryClick: (slug: string) => void;
}

export default function CategorySection({ categories, onCategoryClick }: CategorySectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover custom tailored pieces designed for every member of your family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.slug)}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={category.image_url}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-200 mb-4">{category.description}</p>
                <div className="inline-flex items-center text-amber-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Explore Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
