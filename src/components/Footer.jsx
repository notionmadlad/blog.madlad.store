import { footerLinks } from "@/config/main";
import Image from "next/image";
import Link from "next/link";
import { UserRoundPlus } from "lucide-react";
import dynamic from "next/dynamic";

const Newsletter = dynamic(() => import("./Newsletter"), { ssr: false });

export default function Footer() {
  return (
    <>
      <div className="z-10 relative flex items-center justify-center pt-24">
        <div className="h-full w-full max-w-6xl">
          <div className="mx-10 flex flex-col gap-10">
            <div>
              <div className="flex flex-col gap-6">
                <h1 className="text-[26px] font-semibold xl:text-[30px]">
                  <UserRoundPlus className="mb-1 inline-flex size-[26px] md:mb-2 md:size-[30px]" />{" "}
                  Join my Newsletter
                </h1>
                <p className="max-w-3xl text-[18px] font-medium text-muted-foreground md:text-[20px]">
                  A place where you would have access to powerful Notion
                  templates, resources and much more.
                </p>
              </div>
            </div>
            <Newsletter />
          </div>
        </div>
      </div>
      <footer className="z-10 relative flex items-center justify-center pt-12">
        <div className="h-full w-full max-w-6xl">
          <div className="mx-10 mt-5 border-t border-border pb-12 pt-5 text-[18px] font-semibold">
            ©️ Coding Madlad 2023 - {new Date().getFullYear()}. All right
            reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
