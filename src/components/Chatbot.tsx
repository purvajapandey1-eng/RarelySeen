import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: React.ReactNode;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hey there! I can help you find homegrown brands based on what you're looking for. What do you need?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    const newMsg: Message = { id: Date.now().toString(), role: "user", content: userQuery };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let responseContent: React.ReactNode = "I'm still learning, but I recommend checking out our collections for some inspiration!";
      const q = userQuery.toLowerCase();

      if (q.includes("3k")) {
        responseContent = (
          <span>
            If you need tops under 3k, you should definitely check out{" "}
            <Link to="/categories/$slug" params={{ slug: "tops-under-3k" }} className="underline font-bold text-pink-deep">
              this collection
            </Link>{" "}
            which features brands like Kuuky and Bluer that won't break the bank!
          </span>
        );
      } else if (q.includes("goa") || q.includes("vacay") || q.includes("beach")) {
        responseContent = (
          <span>
            Going to Goa? Love that! I highly recommend checking out{" "}
            <Link to="/brands/$slug" params={{ slug: "shopmeringue" }} className="underline font-bold text-pink-deep">Shop Meringue</Link> and{" "}
            <Link to="/brands/$slug" params={{ slug: "corecotton" }} className="underline font-bold text-pink-deep">Corecotton</Link> for some breezy resort wear. Or explore our full{" "}
            <Link to="/categories/$slug" params={{ slug: "vacay-fits" }} className="underline font-bold text-pink-deep">Vacay Fits</Link> collection.
          </span>
        );
      } else if (q.includes("birthday") || q.includes("zara")) {
        responseContent = (
          <span>
            For birthday dresses that give Zara vibes but support homegrown talent, you must see{" "}
            <Link to="/brands/$slug" params={{ slug: "theclothingfactory" }} className="underline font-bold text-pink-deep">The Clothing Factory</Link> or{" "}
            <Link to="/brands/$slug" params={{ slug: "leaclothingco" }} className="underline font-bold text-pink-deep">Lea Clothing Co</Link>! We also have a{" "}
            <Link to="/categories/$slug" params={{ slug: "birthday-dresses" }} className="underline font-bold text-pink-deep">curated birthday list</Link>.
          </span>
        );
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "a", role: "assistant", content: responseContent },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-pink-deep text-cream border-2 border-ink shadow-brut hover:-translate-y-1 transition active:translate-y-0 flex items-center justify-center"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-card border-2 border-ink rounded-3xl shadow-brut flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-lime p-4 border-b-2 border-ink flex items-center gap-3">
            <div className="bg-white p-2 rounded-full border border-ink shadow-[2px_2px_0px_#050505]">
              <Bot className="size-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg leading-none">Rarely Seen AI</h3>
              <p className="text-xs font-semibold opacity-70 mt-1">Ask me for outfit recs</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-white/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl border-2 border-ink text-sm font-medium ${
                    m.role === "user"
                      ? "bg-pink-deep text-cream rounded-tr-sm"
                      : "bg-white text-ink rounded-tl-sm shadow-[2px_2px_0px_#050505]"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-3 rounded-2xl border-2 border-ink bg-white text-ink rounded-tl-sm shadow-[2px_2px_0px_#050505] flex gap-1 items-center">
                  <span className="w-2 h-2 bg-ink/40 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-ink/40 rounded-full animate-bounce [animation-delay:-.3s]"></span>
                  <span className="w-2 h-2 bg-ink/40 rounded-full animate-bounce [animation-delay:-.5s]"></span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white border-t-2 border-ink flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., I need tops under 3k..."
              className="flex-1 bg-card rounded-full px-4 py-2 text-sm font-medium border-2 border-ink focus:outline-none focus:ring-2 focus:ring-pink-deep placeholder:text-ink/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 bg-lime border-2 border-ink rounded-full text-ink disabled:opacity-50 transition active:scale-95"
            >
              <Send className="size-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
