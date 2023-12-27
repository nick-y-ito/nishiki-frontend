'use client';

import { CaretRightIcon } from '@/assets/images/icons';
import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  Icon,
} from '@/components/ui';
import { Card } from '@/components/ui';
import { foodCategories } from '@/const/foodCategory';
import { cn } from '@/lib/tailwind/utils';

import { useState } from 'react';

export const FoodFilterCategoryDrawer = ({
  selectedCategories,
  toggleCategory,
}: {
  selectedCategories: { [key: string]: boolean };
  toggleCategory: (newValue: string) => void;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div>
      <DrawerRoot open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <button className="w-full flex items-center justify-between mb-2">
            Category
            <figure className="w-12 h-12 flex items-center justify-center">
              <Icon icon={CaretRightIcon} size={2.5} color="gray-dark" />
            </figure>
          </button>
        </DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Category</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-2">
              {Object.entries(foodCategories).map(([key, value]) => {
                const isSelected = selectedCategories[key] || false;
                return (
                  <Card
                    key={key}
                    className={cn('border border-primary', isSelected ? 'bg-primary' : 'bg-white')}
                    onClick={() => toggleCategory(key)}
                    asChild
                  >
                    <button className="flex gap-4 items-center">
                      <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center border border-primary select-none">
                        <span role="img" aria-label={value.name} className="text-lg">
                          {value.emoji}
                        </span>
                      </div>
                      {value.name}
                    </button>
                  </Card>
                );
              })}
            </div>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </div>
  );
};