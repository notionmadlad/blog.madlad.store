import {
  Copy,
  GalleryVerticalEnd,
} from "lucide-react";
import PostCard from "@/components/PostCard";
import { cache } from "@/lib/cache";
import { formatDatabase, queryDatabase } from "@/lib/notion";
import Searchbar from "@/components/Search";
import { Suspense } from "react";

const getPosts = cache(() => queryDatabase().then(formatDatabase), ["/products", "getPosts"], { revalidate: 60 * 60 });

export default async function Products() {
  const database = await getPosts();
  
  return (
    <>
      <section
        id="home"
        className="z-10 relative flex items-center justify-center pt-36"
      >
        <div className="h-full w-full max-w-6xl">
          <div className="mx-10 flex flex-col gap-y-10 lg:flex-row">
            <div className="flex-[3]">
              <div className="flex flex-col gap-6">
                <h1 className="text-[38px] font-semibold md:text-[58px]">
                  <Copy className="mb-1 inline-flex size-[30px] md:mb-2 md:size-[50px]" />{" "}
                  My Blog Posts
                </h1>
              </div>
              <div className="mt-10 flex flex-col gap-6 md:flex-row">
                <Suspense>
                  <Searchbar />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="all"
        className="z-10 relative flex items-center justify-center pt-24"
      >
        <div className="h-full w-full max-w-6xl">
          <div className="mx-10 flex flex-col gap-10">
            <div className="flex-1">
              <div className="flex flex-row items-center justify-between gap-6">
                <h1 className="text-[26px] font-semibold xl:text-[30px]">
                  <GalleryVerticalEnd className="mb-1 inline-flex size-[30px] md:mb-2 md:size-[32px]" />{" "}
                  All Posts
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
              {database.sort((a, b) => new Date(b.Date.start).getTime() - new Date(a.Date.start).getTime()).map(
                (item) => (
                  <Suspense key={item.Id}>
                    <PostCard product={item}/>
                  </Suspense>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
