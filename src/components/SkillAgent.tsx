import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Loader2, Send, Square, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import type { Skill } from "@/lib/skills";

export function SkillAgent({ skill }: { skill: Skill }) {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/skill-chat", body: { slug: skill.slug } }), [skill.slug]);
  const { messages, sendMessage, status, stop, error, setMessages } = useChat({ id: skill.slug, transport });
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [messages]);

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <div className="flex h-[60vh] flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <div className="rounded-lg border border-border/60 bg-background/40 p-4 text-xs text-muted-foreground">
            <p className="mb-3">Agent sẽ làm theo từng bước của skill này. Bắt đầu bằng cách nhập yêu cầu hoặc bấm:</p>
            <Button size="sm" onClick={() => send("Bắt đầu thực hiện skill này.")}>Bắt đầu</Button>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "ml-auto max-w-[85%] rounded-lg bg-primary px-3 py-2 text-xs text-primary-foreground" : "max-w-full rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-xs"}>
            {m.parts.map((p, i) =>
              p.type === "text" ? (
                m.role === "user" ? <p key={i} className="whitespace-pre-wrap">{p.text}</p> :
                <div key={i} className="prose-agent"><ReactMarkdown>{p.text}</ReactMarkdown></div>
              ) : p.type === "reasoning" && p.text ? (
                <details key={i} className="mb-2 text-[10px] text-muted-foreground"><summary className="cursor-pointer">Suy nghĩ</summary><p className="whitespace-pre-wrap">{p.text}</p></details>
              ) : null,
            )}
          </div>
        ))}
        {status === "submitted" && <div className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="size-3 animate-spin" />Agent đang xử lý…</div>}
        {error && <p className="text-xs text-destructive">{error.message}</p>}
        <div ref={endRef} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-3 flex items-end gap-2 border-t border-border/60 pt-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
          rows={2}
          placeholder="Nhập yêu cầu, dán nội dung… (Enter để gửi)"
          className="min-h-10 flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
        />
        {messages.length > 0 && !busy && <Button type="button" variant="outline" size="icon" aria-label="Làm lại từ đầu" onClick={() => setMessages([])}><RotateCcw className="size-4" /></Button>}
        {busy ? <Button type="button" size="icon" aria-label="Dừng" onClick={() => stop()}><Square className="size-4" /></Button>
              : <Button type="submit" size="icon" aria-label="Gửi" disabled={!input.trim()}><Send className="size-4" /></Button>}
      </form>
    </div>
  );
}
