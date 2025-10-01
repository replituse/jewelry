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
    { _id: "all", name: "All Jewelry", slug: "all" },
    ...(categories || []),
  ];

  if (isLoading) {
    return (
      <section className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar pb-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-12 w-32 bg-muted animate-pulse rounded-full"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-secondary py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar category-scroll pb-2">
          {allCategories.map((category) => {
            const isSelected = selectedCategory === category.slug;
            return (
              <Button
                key={category._id}
                onClick={() => onCategorySelect(category.slug)}
                variant={isSelected ? "default" : "outline"}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-medium shadow-sm transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background text-foreground hover:bg-accent hover:shadow-md border border-border"
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
