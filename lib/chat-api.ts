const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface ChatMessage {
  id: number;
  sender: "USER" | "ADMIN";
  text: string;
  createdAt: string;
}

export async function sendChatMessage(data: {
  sessionId: string;
  name: string;
  text: string;
}): Promise<{ success: boolean; message: ChatMessage }> {
  const res = await fetch(`${API_URL}/api/chat/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getChatMessages(
  sessionId: string
): Promise<ChatMessage[]> {
  const res = await fetch(`${API_URL}/api/chat/messages/${sessionId}`);
  if (!res.ok) return [];
  return res.json();
}

export function getChatEventsUrl(sessionId: string): string {
  return `${API_URL}/api/chat/events/${sessionId}`;
}
