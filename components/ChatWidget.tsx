"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  sendChatMessage,
  getChatMessages,
  getChatEventsUrl,
  type ChatMessage,
} from "@/lib/chat-api";

function getOrCreateSessionId(): string {
  const KEY = "goqode-chat-session";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

function getSavedName(): string {
  return localStorage.getItem("goqode-chat-name") || "";
}

function saveName(name: string) {
  localStorage.setItem("goqode-chat-name", name);
}

export function ChatWidget() {
  const t = useTranslations("ChatWidget");

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [hasName, setHasName] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    setMounted(true);
    sessionIdRef.current = getOrCreateSessionId();
    const saved = getSavedName();
    if (saved) {
      setName(saved);
      setHasName(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen && hasName) {
      getChatMessages(sessionIdRef.current).then(setMessages);
    }
  }, [isOpen, hasName]);

  useEffect(() => {
    if (!isOpen || !hasName) return;

    const es = new EventSource(getChatEventsUrl(sessionIdRef.current));

    es.onmessage = (event) => {
      const msg: ChatMessage = JSON.parse(event.data);
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    };

    return () => {
      es.close();
    };
  }, [isOpen, hasName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNameSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim()) return;
      saveName(name.trim());
      setHasName(true);
    },
    [name]
  );

  const handleSend = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || isSending) return;

      setIsSending(true);
      setInput("");

      try {
        await sendChatMessage({
          sessionId: sessionIdRef.current,
          name,
          text,
        });
      } catch {
        setInput(text);
      } finally {
        setIsSending(false);
      }
    },
    [input, isSending, name]
  );

  if (!mounted) return null;

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer"
            aria-label={t("openChat")}
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
              <div>
                <p className="text-sm font-semibold text-black dark:text-zinc-50">
                  {t("title")}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t("subtitle")}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            {!hasName ? (
              <form
                onSubmit={handleNameSubmit}
                className="flex flex-1 flex-col items-center justify-center gap-4 px-6"
              >
                <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                  {t("namePrompt")}
                </p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  maxLength={200}
                  autoFocus
                />
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={!name.trim()}
                >
                  {t("startChat")}
                </Button>
              </form>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                  {messages.length === 0 && (
                    <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 pt-8">
                      {t("emptyState")}
                    </p>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "USER" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                          msg.sender === "USER"
                            ? "bg-foreground text-background"
                            : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSend}
                  className="flex items-center gap-2 border-t border-zinc-200 px-4 py-3 dark:border-zinc-800"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("messagePlaceholder")}
                    maxLength={2000}
                    disabled={isSending}
                    autoFocus
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isSending}
                    className="cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
