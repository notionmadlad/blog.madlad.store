"use client";

import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useSearchParams } from "next/navigation";
import { months } from "@/lib/utils";

function PostCard({ product }) {
  const searchParams = useSearchParams();
  const productValue = JSON.stringify(Object.values(product)).toLowerCase();
  const date = new Date(product.Date.start);

  return (productValue.includes(searchParams.get("search"))) && (
    <CardContainer className="w-full" containerClassName="w-full">
      <CardBody className="group/card overflow- group w-full flex cursor-pointer flex-col rounded-lg border border-border bg-card">
        <Link href={`/posts/${product.Slug[0].plain_text}`}>
          <CardItem translateZ={25} className="flex flex-col gap-5 p-6">
            <CardItem
              translateZ={25}
              className="flex flex-col justify-between gap-2 font-semibold"
            >
              <p className="text-muted-foreground font-normal text-[16px]">#{product.Category.name}</p>
              <p className="text-[20px]">{product.Name[0].plain_text}</p>
              <div className="flex flex-wrap gap-2.5">
                {product.Tags.map(Tag => (
                  <p className="w-max rounded-md bg-secondary px-2.5 py-1 text-[16px]" key={Tag.name}>
                    {Tag.name}
                  </p>
                ))}
              </div>
            </CardItem>
            <p className="text-muted-foreground">{product.Summary[0].plain_text}</p>
            <p className="text-muted-foreground">
              {date.getUTCDate()} {months[date.getUTCMonth()]}, {date.getUTCFullYear()}
            </p>
          </CardItem>
        </Link>
      </CardBody>
    </CardContainer>
  );
}

export default PostCard;
