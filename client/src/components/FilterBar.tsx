import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { Category } from "@shared/schema";

interface FilterBarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function FilterBar({
  selectedCategory,
  onCategorySelect,
}: FilterBarProps) {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const filterOptions = [
    { slug: "all", name: "All" },
    ...(categories || []),
  ];

  if (isLoading) {
    return (
      <section className="py-6 bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[...Array(5)].map((_, i) => (
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
    <section className="py-6 bg-gradient-to-r from-secondary/50 via-amber-50/50 to-secondary/50 border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground mr-2 hidden sm:inline">
            Filter by:
          </span>
          {filterOptions.map((option) => {
            const isSelected = selectedCategory === option.slug;
            return (
              <Button
                key={option.slug}
                onClick={() => onCategorySelect(option.slug)}
                variant={isSelected ? "default" : "outline"}
                className={`
                  relative px-6 py-2 rounded-full font-medium transition-all duration-300
                  ${
                    isSelected
                      ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105 border-2 border-primary"
                      : "bg-white text-foreground hover:bg-primary/10 hover:border-primary/50 border-2 border-border hover:scale-105"
                  }
                `}
              >
                {isSelected && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 opacity-20 animate-pulse" />
                )}
                <span className="relative z-10">{option.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
