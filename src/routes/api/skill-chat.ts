import { createFileRoute } from "@tanstack/react-router";
import { handleSkillChat } from "@/lib/skill-agent.server";

export const Route = createFileRoute("/api/skill-chat")({
  server: { handlers: { POST: ({ request }) => handleSkillChat(request) } },
});
