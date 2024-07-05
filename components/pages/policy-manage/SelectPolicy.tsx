import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SelectPolicy = ({
  handleCurrentPolicy,
  policies,
}: {
  handleCurrentPolicy: (index: number) => void;
  policies: any;
}) => {
  return (
    <Carousel className="w-full max-w-sm order-2 lg:order-1 lg:ml-12">
      <CarouselContent className="-ml-1">
        {policies.map((policy: any, index: number) => {
          return (
            <CarouselItem
              key={index}
              className="pl-1 basis-1/3 lg:basis-1/3 mt-6 lg:mt-0"
            >
              <div
                className="text-lg bg-white/65 rounded-2xl py-1 flex justify-center items-center cursor-pointer active:scale-90 duration-300"
                onClick={() => handleCurrentPolicy(index)}
              >
                保單{index + 1}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="mt-3 ml-10 lg:mt-0" />
      <CarouselNext className="mt-3 mr-10 lg:mt-0" />
    </Carousel>
  );
};

export default SelectPolicy;
