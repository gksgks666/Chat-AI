import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";

type Props = {
  role: "user" | "ai";
  text: string;
};

export default function ChatBubble({ role, text }: Props) {
  const isUser = role === "user";

  if (isUser) {
    //사용자의 질문
    return (
      <div className="flex justify-end w-full">
        <div className="rounded-2xl px-4 py-2 max-w-[80%] text-base shadow-md bg-[#B8E986] text-black">
          {text}
        </div>
      </div>
    );
  }

  return (
    // ai의 응답
    <div className="flex justify-start w-full">
      <div className="prose prose-neutral dark:prose-invert text-base max-w-full whitespace-pre-wrap px-2 py-1">
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
          className="markdown-content"
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}
