"use client";

import { FormEvent, useEffect, useId, useMemo, useState } from "react";
import { Button } from "../button";
import { Avatar } from "../ui/avatar";
import { CountBadge } from "../ui/count-badge";
import { Icon } from "../ui/icon";
import { SearchBar } from "../ui/search-bar";
import { SelectField } from "../ui/select-field";
import { Snackbar } from "../ui/snackbar";
import { TextArea, TextField } from "../ui/text-field";
import { DesignerAppFooter } from "./designer-app-footer";
import { DesignerSidebar } from "./designer-sidebar";
import { UnavailableControl } from "./unavailable";

type Thread = {
  id: string;
  name: string;
  time: string;
  preview: string;
  project?: string;
  unread: number;
  archived: boolean;
  online?: boolean;
  muted?: boolean;
  avatar: string;
};

type ChatMessage = {
  id: string;
  from: "them" | "you";
  name: string;
  time: string;
  text: string;
  file?: { name: string; size: string };
  read?: boolean;
};

const threads: Thread[] = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    time: "10:42 AM",
    preview: "Here are the latest wireframes for review...",
    project: "App Redesign Project",
    unread: 2,
    archived: false,
    online: true,
    avatar: "/images/hiw-avatar-2.png",
  },
  {
    id: "michael",
    name: "Michael Chen",
    time: "Yesterday",
    preview: "Thanks Alex, the logo animation looks perfect.",
    project: "Logo Animation",
    unread: 0,
    archived: false,
    avatar: "/images/hiw-avatar-3.png",
  },
  {
    id: "emma",
    name: "Emma Wilson",
    time: "Oct 12",
    preview: "Can we schedule a quick call tomorrow?",
    unread: 0,
    archived: false,
    muted: true,
    avatar: "/images/designer-naylia.png",
  },
];

const initialChats: Record<string, ChatMessage[]> = {
  sarah: [
    {
      id: "s1",
      from: "them",
      name: "Sarah Johnson",
      time: "10:38 AM",
      text: "Hi Alex! I've reviewed the latest design files you sent over. The new color palette looks fantastic, much better aligned with our brand guidelines now.",
    },
    {
      id: "s2",
      from: "them",
      name: "Sarah Johnson",
      time: "10:42 AM",
      text: "Here are the latest wireframes for review. Could you take a look at the dashboard layout specifically?",
      file: { name: "Dashboard_Wireframes_v2.pdf", size: "2.4 MB" },
    },
    {
      id: "y1",
      from: "you",
      name: "You",
      time: "10:45 AM",
      text: "Thanks Sarah! I'm glad you like the new palette. I'll download these wireframes now and take a look at the dashboard section right away.",
      read: true,
    },
  ],
  michael: [
    {
      id: "m1",
      from: "them",
      name: "Michael Chen",
      time: "Yesterday",
      text: "Thanks Alex, the logo animation looks perfect.",
    },
  ],
  emma: [
    {
      id: "e1",
      from: "them",
      name: "Emma Wilson",
      time: "Oct 12",
      text: "Can we schedule a quick call tomorrow?",
    },
  ],
};

const tabs = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread (2)" },
  { id: "archived", label: "Archived" },
] as const;

const extraContacts: Thread[] = [
  {
    id: "jordan",
    name: "Jordan Lee",
    time: "Now",
    preview: "",
    project: "Brand Refresh",
    unread: 0,
    archived: false,
    avatar: "/images/hiw-avatar-1.png",
  },
  {
    id: "priya",
    name: "Priya Patel",
    time: "Now",
    preview: "",
    project: "Landing Page Contest",
    unread: 0,
    archived: false,
    avatar: "/images/hiw-social-1.png",
  },
];

function NewMessageDialog({
  recipients,
  onClose,
  onSend,
}: {
  recipients: Thread[];
  onClose: () => void;
  onSend: (payload: { recipientId: string; subject: string; text: string }) => void;
}) {
  const titleId = useId();
  const [recipientId, setRecipientId] = useState(recipients[0]?.id ?? "");
  const [subject, setSubject] = useState(recipients[0]?.project ?? "");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!recipientId) {
      setError("Choose someone to message.");
      return;
    }
    if (!text.trim()) {
      setError("Write a message before sending.");
      return;
    }
    onSend({ recipientId, subject: subject.trim(), text: text.trim() });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Close dialog overlay" className="absolute inset-0 bg-[#0f172a]/70" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0px_24px_60px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
          <h2 id={titleId} className="font-sans text-lg font-semibold text-[#111827]">
            New Message
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-lg text-[#6b7280] focus-visible:outline-2 focus-visible:outline-[#7b61ff]"
          >
            <Icon name="x" className="size-3" />
          </button>
        </div>
        <form className="p-5" onSubmit={submit}>
          <p className="font-sans text-sm text-[#6b7280]">
            Compose a note to a client. This stays in your browser session and is not delivered.
          </p>
          <div className="mt-4">
            <SelectField
              id="new-message-to"
              label="To"
              value={recipientId}
              onChange={(event) => {
                const nextId = event.target.value;
                setRecipientId(nextId);
                const next = recipients.find((item) => item.id === nextId);
                if (next?.project) setSubject(next.project);
              }}
            >
              {recipients.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                  {person.project ? ` — ${person.project}` : ""}
                </option>
              ))}
            </SelectField>
          </div>
          <div className="mt-4">
            <TextField
              id="new-message-subject"
              label="Project"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Optional project name"
            />
          </div>
          <div className="mt-4">
            <TextArea
              id="new-message-body"
              label="Message"
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                if (error) setError("");
              }}
              rows={5}
              placeholder="Write your message…"
              error={error}
            />
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="solid" size="sm">
              Send message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function MessagesPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState("sarah");
  const [draft, setDraft] = useState("");
  const [chats, setChats] = useState(initialChats);
  const [threadList, setThreadList] = useState(threads);
  const [localCount, setLocalCount] = useState(0);
  const [composeOpen, setComposeOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const recipients = useMemo(() => {
    const known = new Set(threadList.map((thread) => thread.id));
    return [...threadList, ...extraContacts.filter((person) => !known.has(person.id))];
  }, [threadList]);

  const visible = useMemo(() => {
    return threadList.filter((thread) => {
      if (tab === "unread" && thread.unread === 0) return false;
      if (tab === "archived" && !thread.archived) return false;
      if (
        query &&
        !`${thread.name} ${thread.preview} ${thread.project ?? ""}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [tab, query, threadList]);

  const active = threadList.find((thread) => thread.id === activeId) ?? threadList[0];
  const messages = chats[activeId] ?? [];

  function sendDraft(text: string) {
    const value = text.trim();
    if (!value) return;
    const next = localCount + 1;
    setLocalCount(next);
    setChats((current) => ({
      ...current,
      [activeId]: [
        ...(current[activeId] ?? []),
        {
          id: `local-${next}`,
          from: "you",
          name: "You",
          time: "Now",
          text: value,
        },
      ],
    }));
    setDraft("");
  }

  function sendNewMessage(payload: { recipientId: string; subject: string; text: string }) {
    const recipient =
      recipients.find((person) => person.id === payload.recipientId) ?? extraContacts.find((person) => person.id === payload.recipientId);
    if (!recipient) return;
    const next = localCount + 1;
    setLocalCount(next);
    const preview = payload.text;
    setThreadList((current) => {
      const existing = current.find((thread) => thread.id === recipient.id);
      const updated: Thread = {
        ...(existing ?? recipient),
        time: "Now",
        preview,
        project: payload.subject || existing?.project || recipient.project,
        unread: 0,
        archived: false,
      };
      return [updated, ...current.filter((thread) => thread.id !== recipient.id)];
    });
    setChats((current) => ({
      ...current,
      [recipient.id]: [
        ...(current[recipient.id] ?? []),
        {
          id: `local-${next}`,
          from: "you",
          name: "You",
          time: "Now",
          text: payload.text,
        },
      ],
    }));
    setActiveId(recipient.id);
    setTab("all");
    setComposeOpen(false);
    setNotice(`Saved locally for ${recipient.name}. Nothing was sent to a server.`);
  }

  return (
    <div className="flex w-full flex-col bg-white lg:flex-row lg:items-start">
      <DesignerSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-col gap-4 border-b border-[#e2e8f0] px-5 py-4 sm:h-24 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-0">
            <h1 className="font-sans text-xl font-semibold leading-7 text-[#1e293b]">Messages</h1>
            <div className="flex flex-wrap items-center gap-4">
              <SearchBar
                className="w-full sm:w-[240px]"
                placeholder="Search messages..."
                aria-label="Search messages"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button
                type="button"
                onClick={() => setComposeOpen(true)}
                className="inline-flex h-9 items-center gap-2 rounded-full bg-[#9b82f3] px-4 font-sans text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300"
              >
                <span aria-hidden>+</span>
                New Message
              </button>
            </div>
          </header>
          {notice ? (
            <div className="px-5 pt-4 sm:px-8">
              <Snackbar tone="purple" onDismiss={() => setNotice("")}>
                {notice}
              </Snackbar>
            </div>
          ) : null}

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <section className="w-full border-b border-[#e2e8f0] lg:w-96 lg:border-r lg:border-b-0">
              <div className="flex items-center justify-between gap-3 border-b border-[#e2e8f0] px-4">
                <div className="flex gap-4" role="tablist" aria-label="Conversation filters">
                  {tabs.map((item) => {
                    const current = tab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={current}
                        onClick={() => setTab(item.id)}
                        className={`h-11 shrink-0 font-sans text-sm ${
                          current
                            ? "border-b border-z-300 font-medium text-z-300"
                            : "font-normal text-black"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                <UnavailableControl
                  aria-label="Conversation filters"
                  className="text-[#64748b]"
                  reason="Additional conversation filters are not in this Figma frame as a working control."
                >
                  <Icon name="sliders" className="size-4" />
                </UnavailableControl>
              </div>
              <ul>
                {visible.length === 0 ? (
                  <li className="px-4 py-6 font-sans text-sm text-[#64748b]">
                    No conversations in this view.
                  </li>
                ) : (
                  visible.map((thread) => {
                    const current = thread.id === activeId;
                    return (
                      <li key={thread.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(thread.id)}
                          className={`relative flex w-full items-start gap-3 border-b border-[#e2e8f0] px-4 py-4 text-left ${
                            current ? "bg-z-50" : "bg-white"
                          }`}
                        >
                          {current ? (
                            <span className="absolute top-0 bottom-0 left-0 w-1 bg-[#9b82f3]" />
                          ) : null}
                          <span className="relative mt-0.5 shrink-0">
                            <Avatar src={thread.avatar} size={48} alt="" />
                            {thread.online ? (
                              <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-white bg-[#22c55e]" />
                            ) : null}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center justify-between gap-2">
                              <span
                                className={`font-sans text-sm text-[#1e293b] ${
                                  current ? "font-semibold" : "font-medium"
                                }`}
                              >
                                {thread.name}
                                {thread.muted ? (
                                  <span className="ml-1 text-[#9ca3af]" aria-hidden>
                                    🔇
                                  </span>
                                ) : null}
                              </span>
                              <span className="shrink-0 font-sans text-xs text-[#64748b]">
                                {thread.time}
                              </span>
                            </span>
                            <span className="mt-0.5 flex items-center justify-between gap-2">
                              <span
                                className={`truncate font-sans text-sm ${
                                  current ? "font-medium text-[#1e293b]" : "font-normal text-[#64748b]"
                                }`}
                              >
                                {thread.preview}
                              </span>
                              {thread.unread > 0 ? (
                                <CountBadge className="bg-[#9b82f3] text-[10px]">{thread.unread}</CountBadge>
                              ) : thread.id === "michael" ? (
                                <Icon name="check" className="size-3.5 text-[#22c55e]" />
                              ) : null}
                            </span>
                            {thread.project ? (
                              <span className="mt-0.5 block font-sans text-xs text-[#64748b]">
                                {thread.project}
                              </span>
                            ) : null}
                          </span>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </section>

            <section className="flex min-h-[640px] min-w-0 flex-1 flex-col bg-[#fcfcfd] lg:min-h-[1147px]">
              <div className="flex h-20 items-center justify-between border-b border-[#e2e8f0] bg-white px-6">
                <div className="flex items-center gap-4">
                  <span className="relative">
                    <Avatar src={active.avatar} size={48} alt="" />
                    {active.online ? (
                      <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-white bg-[#22c55e]" />
                    ) : null}
                  </span>
                  <div>
                    <h2 className="font-sans text-base font-semibold leading-6 text-[#1e293b]">
                      {active.name}
                    </h2>
                    <p className="flex items-center gap-1.5 font-sans text-xs text-[#64748b]">
                      {active.online ? <span className="size-1.5 rounded-full bg-[#22c55e]" /> : null}
                      {active.online ? "Online" : "Offline"}
                      {active.project ? ` • ${active.project}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <UnavailableControl
                    aria-label="Start a call"
                    className="flex size-9 items-center justify-center text-[#64748b]"
                    reason="Calls are not connected."
                  >
                    <Icon name="phone" className="size-4" />
                  </UnavailableControl>
                  <UnavailableControl
                    aria-label="Start a video call"
                    className="flex size-9 items-center justify-center text-[#64748b]"
                    reason="Video calls are not connected."
                  >
                    <Icon name="eye" className="size-4" />
                  </UnavailableControl>
                  <span className="h-6 w-px bg-[#e2e8f0]" />
                  <UnavailableControl
                    aria-label="More conversation actions"
                    className="flex size-9 items-center justify-center text-[#64748b]"
                    reason="Conversation menu is not connected."
                  >
                    <Icon name="more-horizontal" className="size-4" />
                  </UnavailableControl>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-6">
                <div className="flex justify-center">
                  <span className="rounded-full bg-[#f3f4f6] px-3 py-1 font-sans text-xs font-medium text-[#64748b]">
                    Today
                  </span>
                </div>
                {messages.map((message) =>
                  message.from === "them" ? (
                    <article key={message.id} className="flex max-w-[602px] gap-4">
                      <Avatar src={active.avatar} size={32} alt="" className="mt-1" />
                      <div className="min-w-0">
                        <p className="mb-1 flex items-baseline gap-2">
                          <span className="font-sans text-sm font-medium text-[#1e293b]">
                            {message.name}
                          </span>
                          <span className="font-sans text-xs text-[#64748b]">{message.time}</span>
                        </p>
                        <div className="rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-[#e2e8f0] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                          <p className="font-sans text-sm leading-5 text-[#1e293b]">{message.text}</p>
                        </div>
                        {message.file ? (
                          <div className="mt-2 flex w-64 items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white p-3">
                            <span className="flex size-10 items-center justify-center rounded bg-[#eff6ff] text-[#3b82f6]">
                              <Icon name="file-text" className="size-5" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-sans text-sm font-medium text-[#1e293b]">
                                {message.file.name}
                              </p>
                              <p className="font-sans text-xs text-[#64748b]">{message.file.size}</p>
                            </div>
                            <UnavailableControl
                              aria-label="Download attachment"
                              className="text-[#64748b]"
                              reason="File download is not connected."
                            >
                              <Icon name="download" className="size-4" />
                            </UnavailableControl>
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ) : (
                    <article key={message.id} className="ml-auto flex max-w-[742px] justify-end gap-2">
                      <div className="min-w-0 text-right">
                        <p className="mb-1 flex items-baseline justify-end gap-2">
                          <span className="font-sans text-xs text-[#64748b]">{message.time}</span>
                          <span className="font-sans text-sm font-medium text-[#1e293b]">You</span>
                        </p>
                        <div className="rounded-tl-2xl rounded-br-2xl rounded-bl-2xl bg-[#9b82f3] px-4 py-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                          <p className="font-sans text-sm leading-5 text-white">{message.text}</p>
                        </div>
                        {message.read ? (
                          <p className="mt-1 flex items-center justify-end gap-1 font-sans text-xs text-[#64748b]">
                            Read <Icon name="check" className="size-3 text-[#22c55e]" />
                          </p>
                        ) : null}
                      </div>
                      <Avatar src="/images/hiw-avatar-1.png" size={32} alt="" className="mt-1" />
                    </article>
                  ),
                )}
              </div>

              <div className="border-t border-[#e2e8f0] bg-white p-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {["I'll check it now", "Looks great!", "Can we jump on a call?"].map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => setDraft(reply)}
                      className="rounded-full border border-[#e2e8f0] px-3 py-1.5 font-sans text-xs text-[#1e293b]"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
                <form
                  className="flex items-end gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendDraft(draft);
                  }}
                >
                  <UnavailableControl
                    aria-label="Attach a file"
                    className="flex size-8 items-center justify-center text-[#64748b]"
                    reason="Attachments are not connected. There is no upload backend."
                  >
                    <Icon name="file-text" className="size-4" />
                  </UnavailableControl>
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Type a message..."
                    className="h-9 min-w-0 flex-1 bg-transparent px-1 font-sans text-sm text-[#1e293b] outline-none placeholder:text-[#64748b]"
                  />
                  <UnavailableControl
                    aria-label="Insert emoji"
                    className="flex size-8 items-center justify-center text-[#64748b]"
                    reason="Emoji picker is not connected."
                  >
                    <span aria-hidden>☺</span>
                  </UnavailableControl>
                  <button
                    type="submit"
                    aria-label="Send message"
                    className="flex size-[30px] items-center justify-center rounded-lg bg-[#9b82f3] text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                  >
                    <Icon name="send" className="size-3.5" />
                  </button>
                </form>
              </div>
            </section>
          </div>
        </main>
        <DesignerAppFooter />
      </div>
      {composeOpen ? (
        <NewMessageDialog recipients={recipients} onClose={() => setComposeOpen(false)} onSend={sendNewMessage} />
      ) : null}
    </div>
  );
}
