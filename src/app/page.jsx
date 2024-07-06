import Image from "next/image";
import { BadgeCheck, Laptop } from "lucide-react";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { PinContainer } from "@/components/ui/3d-pin";
import { Highlight } from "@/components/ui/hero-highlight";
import { cache } from "@/lib/cache";
import { formatDatabase, queryDatabase } from "@/lib/notion";
import { MotionDiv } from "@/components/Motion";
import { Suspense } from "react";

const getPosts = cache(() => queryDatabase().then(formatDatabase), ["/", "getPosts"], { revalidate: 60 * 60 });

export default async function Home() {
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
                  <Laptop className="mb-1 inline-flex size-[30px] md:mb-2 md:size-[50px]" />{" "}
                  Hello mate! I&apos;m <Highlight>Coding Madlad</Highlight>
                </h1>
                <p className="text-[18px] font-medium text-muted-foreground md:text-[20px]">
                  I build minimalistic Notion templates. <br /><Highlight className="text-foreground">Noion and Coding for Life!</Highlight> <span className="dark:hidden">(Use darkmode for a better experience)</span>
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-6 md:flex-row">
                <Link
                  href="/products"
                  className="rounded-lg bg-primary px-9 py-4 text-center font-semibold text-primary-foreground transition-all duration-500"
                >
                  Explore Templates
                </Link>
                <Link
                  href="/gumroad/basic-bundle"
                  className="group hidden justify-center rounded-lg border border-border bg-card py-2 pl-9 pr-2 text-center font-semibold transition-all duration-500 hover:bg-secondary md:flex"
                >
                  <div className="mr-7 py-2">Get Full Bundle</div>
                  <div className="right-2 rounded-md border-border bg-red-600 px-3 py-2 transition-all duration-500 group-hover:bg-red-700 dark:bg-red-700 dark:group-hover:bg-red-800">
                    Free
                  </div>
                </Link>
                <Link
                  href="/gumroad/basic-bundle"
                  className="group rounded-lg border border-border bg-card text-center font-semibold transition-all duration-500 hover:bg-secondary md:hidden"
                >
                  <div className="px-9 pb-2 pt-4">Get Full Bundle</div>
                  <div className="mx-2 mb-2 rounded-md border-border bg-red-600 py-2 transition-all duration-500 group-hover:bg-red-700 dark:bg-red-700 dark:group-hover:bg-red-800">
                    Free
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-[2] items-center justify-center lg:justify-end">
              <MotionDiv
                initial="hidden"
                whileInView="enter"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, x: 100, y: 0 },
                  enter: { opacity: 1, x: 0, y: 0 },
                  exit: { opacity: 0, x: -100, y: 0 },
                }}
                viewport={{ once: true }}
                transition={{ type: "linear", duration: 0.7 }}
                className="mr-[18px] mt-[70px] h-[450px] w-[335px]"
              >
                <PinContainer
                  title="The best Notion Templates await your arrival."
                  href="The best Notion Templates await your arrival."
                  className="h-[450px] w-[335px]"
                >
                  <Image
                    src="/madlad-pfp-transparent.png"
                    alt="madlad"
                    width={335}
                    height={450}
                    className="flip-y"
                  />
                </PinContainer>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>
      <section
        id="popular"
        className="z-10 relative flex items-center justify-center pt-24"
      >
        <div className="h-full w-full max-w-6xl">
          <div className="mx-10 flex flex-col gap-10">
            <div className="flex-1">
              <div className="flex flex-row items-center justify-between gap-6">
                <h1 className="text-[26px] font-semibold xl:text-[30px]">
                  <BadgeCheck className="mb-1 inline-flex size-[30px] md:mb-2 md:size-[32px]" />{" "}
                  All Posts
                </h1>
                <Link href="/posts">
                  <button className="group rounded-lg border border-border bg-card px-4 py-2 font-semibold transition-all duration-500 hover:bg-secondary">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
              {database.sort((a, b) => new Date(b.Date.start).getTime() - new Date(a.Date.start).getTime()).splice(0, 3).map(
                (item) => (
                  <Suspense key={item.Id}>
                    <PostCard product={item}/>
                  </Suspense>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
