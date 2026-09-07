import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/cards/CategoryCard";

/**
 * The five-category grid, shared by the home page and the products index.
 * Five items in a three-column grid leaves a gap on the last row, so the two
 * trailing cards are centred rather than left hanging.
 */
export function CategoryGrid() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <CategoryCard
          key={category.slug}
          category={category}
          delay={index * 70}
        />
      ))}
    </ul>
  );
}
