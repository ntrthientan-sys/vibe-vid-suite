import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { skills } from "@/lib/skills";
import sharedRules from "@/content/skills/00-quy-tac-chung-2-track.md?raw";

const RUN_ID = "X-Lovable-AIG-Run-ID";

function runIdFetch(initial?: string) {
  let runId = initial?.trim() || undefined;
  return {
    getRunId: () => runId,
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      if (runId && !headers.has(RUN_ID)) headers.set(RUN_ID, runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get(RUN_ID)?.trim() || undefined;
      return res;
    },
  };
}

export async function handleSkillChat(request: Request) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return new Response("Thiếu cấu hình AI", { status: 500 });

  let body: { slug?: string; messages?: UIMessage[] };
  try { body = await request.json(); } catch { return new Response("Yêu cầu không hợp lệ", { status: 400 }); }
  const skill = skills.find((s) => s.slug === body.slug);
  if (!skill || !Array.isArray(body.messages)) return new Response("Skill không tồn tại", { status: 400 });

  const system = `Bạn là Agent thực thi skill "${skill.label}" cho người dùng tên Tân. Làm đúng từng bước của skill dưới đây, hỏi khi skill yêu cầu hỏi, chờ duyệt khi skill yêu cầu duyệt. Trả lời bằng tiếng Việt, định dạng Markdown gọn gàng. Nếu skill cần file hồ sơ/giọng văn mà người dùng chưa cung cấp, hãy đề nghị họ dán nội dung vào chat.

# QUY TẮC CHUNG
${sharedRules}

# SKILL: ${skill.slug}
Mô tả: ${skill.description}

${skill.body}`;

  const rf = runIdFetch(request.headers.get(RUN_ID) ?? undefined);
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: rf.fetch,
  });

  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system,
    messages: await convertToModelMessages(body.messages),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
    onError: (e) => {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("402")) return "Hết lượt dùng AI — hãy nạp thêm credit trong cài đặt workspace.";
      if (msg.includes("429")) return "AI đang quá tải, thử lại sau ít phút.";
      return "Agent gặp lỗi: " + msg;
    },
  });
}
