"use client";

import { FormEvent, useState } from "react";
import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";
import { FaqItem } from "../ui/faq";
import { SelectField } from "../ui/select-field";
import { TextArea, TextField } from "../ui/text-field";

const card =
  "rounded-3xl border border-[#f9fafb] bg-white p-10 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)]";

const faqs = [
  "How do I choose the right designer?",
  "What happens if I'm not satisfied?",
  "How does the payment process work?",
];

const socials = [
  { src: "/images/hiw-social-1.png", label: "Zyroun on X" },
  { src: "/images/hiw-social-3.png", label: "Zyroun on LinkedIn" },
  { src: "/images/hiw-social-2.png", label: "Zyroun on Instagram" },
];

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!message.trim()) next.message = "Enter a message.";
    setErrors(next);
  }

  return (
    <main className="flex w-full flex-col items-center gap-8 bg-white pb-2">
      <section className="flex w-full max-w-[896px] flex-col items-center gap-6 px-6 pt-[22px] pb-[31px]">
        <h1 className="max-w-[768px] text-center font-display text-[32px] leading-10 font-bold text-[#0f172a] md:text-[48px] md:leading-[52px]">
          Connecting Visionaries with
          <br />
          <em className="bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text font-serif font-normal text-transparent italic">
            Exceptional Talent.
          </em>
        </h1>
        <p className="max-w-[768px] text-center font-sans text-base leading-[29.5px] text-[#64748b] md:text-lg">
          Zyroun is a modern platform built to bridge the gap between ambitious
          clients and top-tier designers globally. We believe great design
          should be accessible, seamless, and secure.
        </p>
      </section>

      <section className="w-full px-5 md:px-8">
        <div className="mx-auto grid w-full max-w-[1104px] gap-8 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-12 pb-0 md:pb-[52px]">
          <article className={card}>
            <div className="border-b border-[#f9fafb] pb-6">
              <h2 className="font-sans text-xl leading-7 font-bold text-[#0f172a]">
                Why Trust Zyroun?
              </h2>
              <p className="mt-2 font-sans text-sm leading-5 text-[#64748b]">
                Our commitment to quality and security.
              </p>
            </div>
            <ul className="mt-8 flex flex-col gap-6">
              <li className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f3f0ff]">
                  <FigmaAsset src="/images/contact-icon-vetting.png" alt="" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-sans text-sm leading-5 font-semibold text-[#0f172a]">
                    Rigorous Designer Vetting
                  </h3>
                  <p className="font-sans text-xs leading-[19.5px] text-[#64748b]">
                    Every designer on our platform passes a comprehensive
                    portfolio review and skills assessment. We only accept the
                    top 5% of applicants.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eff6ff]">
                  <FigmaAsset src="/images/contact-icon-payments.svg" alt="" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-sans text-sm leading-5 font-semibold text-[#0f172a]">
                    100% Secure Payments
                  </h3>
                  <p className="font-sans text-xs leading-[19.5px] text-[#64748b]">
                    Your funds are held securely in escrow until you approve the
                    final milestones. No hidden fees, ever.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f3f0ff]">
                  <FigmaAsset src="/images/contact-icon-support.svg" alt="" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-sans text-sm leading-5 font-semibold text-[#0f172a]">
                    24/7 Dedicated Support
                  </h3>
                  <p className="font-sans text-xs leading-[19.5px] text-[#64748b]">
                    Our global support team is always ready to assist you with
                    any questions or project mediation needs.
                  </p>
                </div>
              </li>
            </ul>
          </article>

          <article className={card}>
            <div className="border-b border-[#f9fafb] pb-6">
              <h2 className="font-sans text-xl leading-7 font-bold text-[#0f172a]">
                Common Questions
              </h2>
              <p className="mt-2 font-sans text-sm leading-5 text-[#64748b]">
                Quick answers to help you get started.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              {faqs.map((question) => (
                <FaqItem key={question} question={question}>
                  Use the contact form on this page.
                </FaqItem>
              ))}
            </div>
          </article>
        </div>

        <div className="flex flex-col gap-8">
          <article className={`relative overflow-hidden ${card} pb-14`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 size-64 rounded-tr-full bg-gradient-to-br from-[#2563eb]/5 to-[#7c3aed]/5 opacity-50"
            />
            <div className="relative">
              <div className="border-b border-[#f9fafb] pb-6">
                <h2 className="font-sans text-xl leading-7 font-bold text-[#0f172a]">
                  Get in Touch
                </h2>
                <p className="mt-2 font-sans text-sm leading-5 text-[#64748b]">
                  Have a question or need custom support? Drop us a message.
                </p>
              </div>
              <form className="mt-8 flex flex-col gap-6" onSubmit={onSubmit} noValidate>
                <TextField
                  id="contact-name"
                  name="name"
                  label="Full Name *"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g., Jane Doe"
                  error={errors.name}
                />
                <TextField
                  id="contact-email"
                  type="email"
                  name="email"
                  label="Email Address *"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="jane@example.com"
                  error={errors.email}
                />
                <SelectField
                  id="contact-topic"
                  name="topic"
                  label="Subject"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                >
                  <option value="">Select a topic...</option>
                </SelectField>
                <TextArea
                  id="contact-message"
                  name="message"
                  label="Message *"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="How can we help you today?"
                  rows={5}
                  error={errors.message}
                />
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    size="sm"
                    iconPosition="end"
                    icon={<FigmaAsset src="/images/contact-icon-send.svg" alt="" />}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </article>

          <article className={card}>
            <h3 className="font-sans text-sm leading-5 font-semibold text-[#0f172a]">
              Direct Support
            </h3>
            <div className="mt-[19px] flex flex-col gap-5">
              <div className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center">
                  <FigmaAsset src="/images/contact-icon-email.svg" alt="" />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="font-sans text-sm text-[#9ca3af]">Email Support</p>
                  <a
                    href="mailto:support@zyroun.com"
                    className="font-poppins text-lg font-medium text-[#7b61ff]"
                  >
                    support@zyroun.com
                  </a>
                  <p className="font-sans text-xs text-[#64748b]">
                    We typically reply within 24 hours.
                  </p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center">
                  <FigmaAsset src="/images/contact-icon-phone.svg" alt="" />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="font-sans text-sm text-[#9ca3af]">
                    Phone (Mon-Fri, 9am-5pm EST)
                  </p>
                  <a
                    href="tel:+18001234567"
                    className="font-poppins text-lg font-medium text-[#7b61ff]"
                  >
                    +1 (800) 123-4567
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href="#"
                    aria-label={item.label}
                    className="flex size-10 items-center justify-center rounded-full bg-[#f9fafb]"
                  >
                    <FigmaAsset src={item.src} alt="" className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </article>
        </div>
        </div>
      </section>
    </main>
  );
}
