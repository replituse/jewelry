import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { Category } from "@shared/schema";

interface CategoryScrollProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function CategoryScroll({
  selectedCategory,
  onCategorySelect,
}: CategoryScrollProps) {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const allCategories = [
    { _id: "all", name: "All", slug: "all" },
    ...(categories || []),
  ];

  if (isLoading) {
    return (
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 bg-muted animate-pulse rounded-full"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-4 border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-2">
          {allCategories.map((category) => {
            const isSelected = selectedCategory === category.slug;
            return (
              <Button
                key={category._id}
                onClick={() => onCategorySelect(category.slug)}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={`rounded-full font-medium transition-all ${
                  isSelected
                    ? "bg-primary text-white hover:bg-primary/90 shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                }`}
                data-testid={`button-category-scroll-${category.slug}`}
              >
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
