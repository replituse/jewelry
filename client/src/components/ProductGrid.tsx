import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";
import { useMemo, useState } from "react";
import type { FilterOptions } from "@/components/FilterDrawer";
import ProductDetailsDialog from "@/components/ProductDetailsDialog";

interface ProductGridProps {
  selectedCategory: string;
  searchQuery?: string;
  priceRange?: [number, number];
  filters?: FilterOptions;
}

export default function ProductGrid({ selectedCategory, searchQuery = "", priceRange, filters }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", selectedCategory],
    queryFn: async () => {
      const url =
        selectedCategory === "all"
          ? "/api/products"
          : `/api/products?category=${selectedCategory}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  // Filter products based on search query, price range, and other filters
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          (product.description || '').toLowerCase().includes(query) ||
          (product.category || '').toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    if (priceRange) {
      filtered = filtered.filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    // Apply purity filter
    if (filters?.purity && filters.purity.length > 0) {
      filtered = filtered.filter((product) => 
        product.purity && filters.purity.includes(product.purity)
      );
    }

    // Apply weight filter
    if (filters?.weight && filters.weight.length > 0) {
      filtered = filtered.filter((product) => 
        product.weight && filters.weight.includes(product.weight)
      );
    }

    // Apply stone filter
    if (filters?.stone && filters.stone.length > 0) {
      filtered = filtered.filter((product) => 
        product.stone && filters.stone.includes(product.stone)
      );
    }

    // Apply gender filter
    if (filters?.gender && filters.gender.length > 0) {
      filtered = filtered.filter((product) => 
        product.gender && filters.gender.includes(product.gender)
      );
    }

    // Apply occasion filter
    if (filters?.occasion && filters.occasion.length > 0) {
      filtered = filtered.filter((product) => 
        product.occasion && filters.occasion.includes(product.occasion)
      );
    }

    return filtered;
  }, [products, searchQuery, priceRange, filters]);

  const getCategoryName = (slug: string): string => {
    const categoryNames: Record<string, string> = {
      all: "All Jewelry",
      necklaces: "Necklaces",
      earrings: "Earrings",
      rings: "Rings",
      bracelets: "Bracelets",
      bangles: "Bangles",
      pendants: "Pendants",
      sets: "Jewelry Sets",
    };
    return categoryNames[slug] || "All Jewelry";
  };

  if (isLoading) {
    return (
      <section className="bg-background py-12" id="products-section">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="h-10 w-64 bg-muted animate-pulse rounded mx-auto mb-2" />
            <div className="h-4 w-48 bg-muted animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[3/4] bg-muted animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-4 bg-muted animate-pulse rounded mb-3 w-2/3" />
                  <div className="h-6 bg-muted animate-pulse rounded w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-12" id="products-section">
      <div className="container mx-auto px-4">
        {/* Category Title */}
        <div className="mb-8">
          <h2
            className="font-serif text-3xl md:text-4xl font-bold text-center mb-2"
            data-testid="text-category-title"
          >
            {getCategoryName(selectedCategory)}
          </h2>
          <p className="text-center text-muted-foreground" data-testid="text-product-count">
            {filteredProducts && filteredProducts.length > 0
              ? `Showing ${filteredProducts.length} exquisite ${filteredProducts.length === 1 ? "piece" : "pieces"}`
              : searchQuery
              ? "No products match your search"
              : "No products found in this category"}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product._id}
                  className="product-card overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-all"
                  data-testid={`card-product-${product._id}`}
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      data-testid={`img-product-${product._id}`}
                    />
                    {product.featured && (
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        NEW
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                        SALE
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3
                      className="font-serif text-lg font-semibold mb-2"
                      data-testid={`text-product-name-${product._id}`}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-sm text-muted-foreground mb-3 line-clamp-2"
                      data-testid={`text-product-description-${product._id}`}
                    >
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="font-bold text-xl text-primary"
                          data-testid={`text-product-price-${product._id}`}
                        >
                          ₹{product.price.toLocaleString()}
                        </p>
                        {product.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-2 hover:bg-accent rounded-full transition-colors"
                        aria-label="Add to favorites"
                        data-testid={`button-favorite-${product._id}`}
                      >
                        <Heart className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {filteredProducts.length >= 8 && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid="button-load-more"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchQuery
                ? "No products match your search criteria. Try adjusting your filters."
                : "No products available in this category yet."}
            </p>
            {!searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                Please add products to your MongoDB database.
              </p>
            )}
          </div>
        )}
      </div>

      <ProductDetailsDialog
        product={selectedProduct}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
