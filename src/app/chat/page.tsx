import Message from "./_components/Message";

const chats: {
  text: string;
  from: "me" | "other";
  options?: string[];
}[] = [
  {
    text: "here's the picture book of the day:",
    from: "other",
    options: ["Read", "More"],
  },
  { text: "Option1", from: "me" },
  {
    text: "Here's the first question:",
    from: "other",
    options: ["option1", "option2", "option3"],
  },
  { text: "Yes", from: "me" },
  {
    text: "Hello, {username}. I'm Abby. Nice to meet you. Are you ready to get started?",
    from: "other",
    options: ["Yes"],
  },
];

export default function ChatPage() {
  const date = "Today, 12/01";

  return (
    <div className="flex max-h-screen w-full flex-col items-center justify-center bg-[#BEBEBE] py-10">
      <div className="w-2/3 overflow-y-auto rounded-xl bg-white shadow-md">
        <div className="flex w-full items-center justify-start px-8 py-3 shadow">
          <span className="chatbot-icon">ICON</span>
          <span className="p-4 text-xl">PicPick</span>
        </div>

        <div className="p-8">
          <p className="mx-[auto] mb-8 max-w-[100px] rounded-full bg-gray-200 px-2.5 py-1 text-center text-xs">
            {date}
          </p>

          <div className="flex grow flex-col-reverse space-y-1 overflow-y-auto">
            {chats.map((chat, idx) => (
              <Message chat={chat} key={idx}></Message>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
