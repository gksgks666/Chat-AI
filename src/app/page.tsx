//import Image from "next/image";
import ChatInput from "@/components/ChatInput";
import ChatContent from "@/components/ChatContent";

export default function Home() {
  // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
  //  >
  //</div>
  return (
    <main className="flex flex-col items-center min-h-screen">
      <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-white shadow-md w-full sticky top-0">
        <h1 className="text-xl font-bold text-gray-800">Gemini2.0 flash AI</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-[#B8E986] rounded-lg hover:bg-[#A3D375] transition cursor-pointer">
          새 채팅
        </button>
      </header>

      <ChatContent />
      <div className="w-full flex flex-col items-center sticky bottom-0 bg-white">
        <ChatInput />
        <footer className="text-gray items-center">
          AI는 거짓말을 할 수 있습니다.
        </footer>
      </div>
    </main>
  );
}

/* export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx gg
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
      <div className="bg-blue-500 sm:bg-green-500 md:bg-yellow-500 lg:bg-red-500 xl:bg-purple-500">
        반응형 배경색 변경1
      </div>
      <div className="bg-green-100 p-4 sm:p-6 md:p-8 lg:p-12">
        패딩 크기 변경됨
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-gray-200 p-4">Box 1</div>
        <div className="bg-gray-300 p-4">Box 2</div>
        <div className="bg-gray-400 p-4">Box 3</div>
        <div className="bg-gray-500 p-4">Box 4</div>
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-4">
        <div className="bg-blue-200 p-4 w-full sm:w-1/2">Left</div>
        <div className="bg-red-200 p-4 w-full sm:w-1/2">Right</div>
      </div>
    </div>
  );
} */
