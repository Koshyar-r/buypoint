import type { FC, ChangeEvent } from "react";
import { getData } from "../context/DataContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface FilterSectionProps {
  search: string;
  setSearch: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  category: string;
  setCategory: (value: string) => void;
  handleBrandChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleCategoryChange: (e: ChangeEvent<HTMLInputElement>) => void; // ✅ checkbox
}

const FilterSection: FC<FilterSectionProps> = ({
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory, // currently unused directly
  handleCategoryChange,
}) => {
  const { categoryOnlyData, brandOnlyData } = getData();

  return (
    <div className="bg-background text-foreground mt-10 p-6 rounded-md h-max hidden md:block shadow-md space-y-6 w-80 flex-shrink-0">
      {/* Search */}
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-12 text-base w-full"
      />

      {/* Categories */}
      <div className="space-y-2">
        <h1 className="text-lg font-semibold mb-2">Category</h1>
        <div className="flex flex-col gap-2">
          {categoryOnlyData?.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={item}
                checked={category === item}
                value={item}
                onChange={handleCategoryChange}
                className="accent-primary w-5 h-5"
              />
              <span className="cursor-pointer uppercase text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-2">
        <h1 className="text-lg font-semibold mb-2">Brand</h1>
        <Select value={brand} onValueChange={(val) => setBrand(val)}>
          <SelectTrigger className="w-full h-12 text-base">
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {brandOnlyData?.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <h1 className="text-lg font-semibold mb-1">Price Range</h1>
        <span className="text-sm">
          ${priceRange[0]} - ${priceRange[1]}
        </span>
        <Slider
          value={[priceRange[1]]}
          max={5000}
          onValueChange={(val) => setPriceRange([priceRange[0], val[0]])}
          className="h-4 w-full"
        />
      </div>

      {/* Reset Button */}
      <Button
        variant="secondary"
        className="w-full h-12 text-base mt-4"
        onClick={() => {
          setSearch("");
          setCategory("All");
          setBrand("All");
          setPriceRange([0, 5000]);
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSection;