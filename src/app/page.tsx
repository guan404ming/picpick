import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  return (
    <div className="w-full p-6">
      <div className="grid h-[55vh] grid-cols-1 gap-7 rounded-lg bg-[url('/light-bg.jpeg')] bg-cover bg-no-repeat p-10 text-center drop-shadow dark:bg-slate-800 dark:bg-[url('/dark-bg.jpeg')]">
        <p className="truncate text-4xl font-bold">PICPICK</p>

        <div className="text-xl max-md:space-y-2">
          <p className="font-bold max-md:text-sm">
            Make a click, we take a pick.
          </p>
          <p className="max-md:text-sm">
            Unlock your Personalized PicBook with PICPICK!
          </p>
        </div>

        <Button className="mx-auto w-1/6 p-6 text-xl drop-shadow-lg max-md:w-[100px]">
          Start
        </Button>
      </div>

      <Separator className="my-8"></Separator>

      <div className="grid grid-cols-6 py-10 max-md:flex max-md:flex-col">
        <p className="col-span-2 flex items-center justify-center text-center text-3xl font-bold">
          About
        </p>
        <div className="max-md:text-md col-span-4 pr-20 text-xl leading-normal max-md:px-2 max-md:pt-6 max-md:text-sm">
          PICPICK is a picture book recommendation website where users can
          receive AI-curated book suggestions by responding to psychological
          assessment questions. Users can explore, read, and collect the
          recommended picture books. Through the design, we aim to create a
          therapeutic and inspiring experience for readers, providing solace and
          inspiration in their daily lives.
        </div>
      </div>
    </div>
  );
}
