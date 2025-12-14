import type { FC, ChangeEvent } from "react";
import { FaFilter } from "react-icons/fa6";
import { getData } from "../context/DataContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface MobileFilterProps {
  openFilter: boolean;
  setOpenFilter: (val: boolean) => void;
  search: string;
  setSearch: (val: string) => void;
  brand: string;
  setBrand: (val: string) => void;
  priceRange: [number, number];
  setPriceRange: (val: [number, number]) => void;
  category: string;
  setCategory: (val: string) => void;
  handleCategoryChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MobileFilter: FC<MobileFilterProps> = ({
  openFilter,
  setOpenFilter,
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory, // used in reset
  handleCategoryChange,
}) => {
  const { categoryOnlyData, brandOnlyData } = getData();

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <>
      <div className="bg-background flex justify-between items-center md:hidden px-4 py-3 mt-5 shadow-md rounded-md">
        <h1 className="font-semibold text-xl">Filters</h1>
        <FaFilter
          onClick={toggleFilter}
          className="text-foreground cursor-pointer"
        />
      </div>

      {openFilter && (
        <div className="bg-background p-4 md:hidden rounded-md mt-2 shadow-md space-y-6">
          {/* Search */}
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12"
          />

          {/* Categories */}
          <div className="space-y-2">
            <h1 className="text-lg font-semibold">Category</h1>
            <div className="flex flex-col gap-2">
              {/* All option */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="All"
                  checked={category === "All"}
                  value="All"
                  onChange={handleCategoryChange}
                  className="accent-primary w-5 h-5"
                />
                <span className="cursor-pointer uppercase text-sm">All</span>
              </div>

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
                  <span className="cursor-pointer uppercase text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <h1 className="text-lg font-semibold">Brand</h1>
            <Select value={brand} onValueChange={(val) => setBrand(val)}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="All">All brands</SelectItem>
                {brandOnlyData?.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item?.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <h1 className="text-lg font-semibold">Price Range</h1>
            <span className="text-sm">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
            <Slider
              value={[priceRange[1]]}
              max={5000}
              onValueChange={(val) =>
                setPriceRange([priceRange[0], val[0]])
              }
              className="w-full"
            />
          </div>

          {/* Reset Button */}
          <Button
            variant="secondary"
            className="w-full h-12 mt-2"
            onClick={() => {
            setSearch("");
            setCategory("All");
            setBrand("All");
            setPriceRange([0, 5000]);
            setOpenFilter(false);
          }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </>
  );
};

export default MobileFilter;