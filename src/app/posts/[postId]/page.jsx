import { cache } from "@/lib/cache";
import { formatDatabase, notion, queryDatabase } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import { NotionAPI } from "notion-client";
import { months } from "@/lib/utils";
import Image from "next/image";

const getPosts = cache(() => queryDatabase().then(formatDatabase), ["/", "getPosts"], { revalidate: 60 * 60 });

export default async function Home({ params }) {
  const database = await getPosts();
  const page = database.find(item => item.Slug[0].plain_text === params.postId);
  
  if (!page) return;

  const date = new Date(page.Date.start);
  const client = new NotionAPI();
  const recordMap = await client.getPage(page?.Id);
  const author = await notion.users.retrieve({ user_id: page.Author[0].id });

  console.log(author);

  return (
    <>
      <section
        id="popular"
        className="z-10 relative flex items-center justify-center pt-24"
      >
        <div className="h-full w-full max-w-6xl">
          <div className="mx-10 flex flex-col gap-10">
            <div className="mx-auto w-fit rounded-lg border border-border bg-card p-10">
              <div className="flex flex-col gap-4 pb-5">
                <p className="text-muted-foreground font-normal text-[16px]">#{page.Category.name}</p>
                <p className="text-[20px]">{page.Name[0].plain_text}</p>
                <div className="flex gap-5">
                  <div className="flex items-center gap-2 pr-5 border-r border-primary">
                    <Image alt={author.name} className="rounded-full" src={author.avatar_url} width={32} height={32} />
                    <p>{author.name}</p>
                  </div>
                  <p className="text-muted-foreground flex items-center">
                    {date.getUTCDate()} {months[date.getUTCMonth()]}, {date.getUTCFullYear()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {page.Tags.map(Tag => (
                    <p className="w-max rounded-md bg-secondary px-2.5 py-1 text-[16px]" key={Tag.name}>
                      {Tag.name}
                    </p>
                  ))}
                </div>
              </div>
              <NotionRenderer recordMap={recordMap} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}