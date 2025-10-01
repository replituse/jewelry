import { X, Heart, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductDetailsDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductDetailsDialog({
  product,
  open,
  onOpenChange,
}: ProductDetailsDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 h-full">
          {/* Image Section */}
          <div className="relative bg-muted flex items-center justify-center overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
            {product.featured && (
              <Badge className="absolute top-6 right-6 bg-primary text-primary-foreground text-sm px-3 py-1">
                NEW
              </Badge>
            )}
            {product.originalPrice && (
              <Badge className="absolute top-6 right-6 bg-destructive text-destructive-foreground text-sm px-3 py-1">
                SALE
              </Badge>
            )}
            <DialogClose className="absolute top-6 left-6 rounded-full bg-background/80 p-2 hover:bg-background transition-colors">
              <X className="h-5 w-5" />
            </DialogClose>
          </div>

          {/* Details Section */}
          <div className="flex flex-col p-6 md:p-8 overflow-y-auto">
            <div className="flex-1">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                {product.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4 capitalize">
                {product.category}
              </p>

              <div className="flex items-baseline gap-3 mb-6">
                <p className="font-bold text-4xl text-primary">
                  ₹{product.price.toLocaleString()}
                </p>
                {product.originalPrice && (
                  <p className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Product Details */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-lg">Product Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {product.purity && (
                    <div>
                      <span className="text-muted-foreground">Purity:</span>
                      <span className="ml-2 font-medium">{product.purity}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div>
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="ml-2 font-medium">{product.weight}</span>
                    </div>
                  )}
                  {product.stone && (
                    <div>
                      <span className="text-muted-foreground">Stone:</span>
                      <span className="ml-2 font-medium">{product.stone}</span>
                    </div>
                  )}
                  {product.gender && (
                    <div>
                      <span className="text-muted-foreground">For:</span>
                      <span className="ml-2 font-medium">{product.gender}</span>
                    </div>
                  )}
                  {product.occasion && (
                    <div>
                      <span className="text-muted-foreground">Occasion:</span>
                      <span className="ml-2 font-medium">{product.occasion}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Stock:</span>
                    <span className={`ml-2 font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                size="lg"
                className="flex-1 font-semibold"
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="aspect-square p-0"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
