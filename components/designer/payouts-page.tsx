"use client";

import { useMemo, useState } from "react";
import { FigmaAsset } from "../figma-asset";
import { DesignerSidebar } from "./designer-sidebar";
import { UnavailableControl } from "./unavailable";

type TxType = "earning" | "withdrawal";
type TxStatus = "completed" | "processing" | "pending";

type Row = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  type: TxType;
  status: TxStatus;
  amount: string;
  fee: string;
  net: string;
  feeTone: "red" | "muted";
};

const rows: Row[] = [
  {
    id: "1",
    date: "Nov 02, 2023",
    title: "App Redesign Milestone 2",
    subtitle: "Nexus Financial",
    type: "earning",
    status: "completed",
    amount: "$1,500.00",
    fee: "-$75.00",
    net: "$1,425.00",
    feeTone: "red",
  },
  {
    id: "2",
    date: "Oct 28, 2023",
    title: "Bank Transfer to Chase ****4589",
    subtitle: "Manual Withdrawal",
    type: "withdrawal",
    status: "processing",
    amount: "-$2,000.00",
    fee: "$0.00",
    net: "-$2,000.00",
    feeTone: "muted",
  },
  {
    id: "3",
    date: "Oct 25, 2023",
    title: "Logo Animation Final Delivery",
    subtitle: "Aura Wellness",
    type: "earning",
    status: "pending",
    amount: "$850.00",
    fee: "-$42.50",
    net: "$807.50",
    feeTone: "red",
  },
  {
    id: "4",
    date: "Oct 15, 2023",
    title: "Automatic Payout",
    subtitle: "Standard Schedule",
    type: "withdrawal",
    status: "completed",
    amount: "-$1,250.00",
    fee: "$0.00",
    net: "-$1,250.00",
    feeTone: "muted",
  },
];

const statusClass: Record<TxStatus, string> = {
  completed: "border border-[#dcfce7] bg-[#f0fdf4] text-[#16a34a]",
  processing: "border border-[#dbeafe] bg-[#eff6ff] text-[#2563eb]",
  pending: "border border-[#ffedd5] bg-[#fff7ed] text-[#ea580c]",
};

const statusLabel: Record<TxStatus, string> = {
  completed: "Completed",
  processing: "Processing",
  pending: "Pending",
};

const tabs = [
  ["all", "All Transactions"],
  ["recent", "Recent Payouts"],
  ["pending", "Pending Clearance"],
  ["completed", "Completed"],
] as const;

export function PayoutsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number][0]>("all");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [range, setRange] = useState("30");
  const [page, setPage] = useState(1);

  const visible = useMemo(() => {
    return rows.filter((row) => {
      if (tab === "recent" && row.type !== "withdrawal") return false;
      if (tab === "pending" && row.status !== "pending" && row.status !== "processing") return false;
      if (tab === "completed" && row.status !== "completed") return false;
      if (typeFilter !== "all" && row.type !== typeFilter) return false;
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (
        query &&
        !`${row.title} ${row.subtitle} ${row.date}`.toLowerCase().includes(query.toLowerCase())
      ) {
        return false;
      }
      if (range !== "30" && range !== "90") return false;
      return true;
    });
  }, [tab, query, typeFilter, statusFilter, range]);

  return (
    <div className="flex min-h-0 w-full flex-col bg-[#f8fafc] lg:flex-row">
      <DesignerSidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden bg-[#f8fafc]">
        <header className="flex h-auto flex-col gap-4 border-b border-[#e2e8f0] bg-white px-5 py-4 sm:h-20 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-0">
          <h1 className="font-sans text-xl font-semibold leading-7 text-[#1e293b]">Payouts Log</h1>
          <UnavailableControl
            className="inline-flex h-9 items-center rounded-lg bg-[#9b82f3] px-4 font-sans text-sm font-medium text-white"
            reason="Withdraw Funds is not connected. Payments are not implemented."
          >
            Withdraw Funds
          </UnavailableControl>
        </header>

        <div className="flex flex-wrap items-center gap-3 border-b border-[#e2e8f0] bg-white px-5 py-3 sm:px-8">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setTab(id);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 font-sans text-sm font-medium ${
                tab === id
                  ? "bg-[#9b82f3] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#64748b]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6 px-5 py-6 sm:px-8">
          <div className="flex gap-3 rounded-xl border border-[#e0e7ff] bg-[#eef2ff] p-4">
            <span className="mt-0.5 font-sans text-sm text-[#312e81]" aria-hidden="true">
              ⓘ
            </span>
            <div>
              <p className="font-sans text-sm font-semibold text-[#312e81]">Standard Payout Schedule</p>
              <p className="mt-1 font-sans text-xs leading-4 text-[#4338ca]">
                Available balances are automatically processed on the 1st and 15th of every month.
                Manual withdrawals take 2-3 business days to reflect in your connected bank account.{" "}
                <UnavailableControl
                  className="inline font-medium underline"
                  reason="Payout policy is not connected."
                >
                  View full policy
                </UnavailableControl>
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-[#e2e8f0] bg-white px-6 pt-6 pb-9">
              <p className="font-sans text-sm font-medium text-[#64748b]">Available Balance</p>
              <p className="mt-2 font-sans text-[30px] leading-9 font-bold text-[#1e293b]">$3,450.00</p>
              <p className="mt-2 font-sans text-xs font-medium text-[#16a34a]">+12% this month</p>
            </article>
            <article className="rounded-xl border border-[#e2e8f0] bg-white px-6 pt-6 pb-9">
              <p className="font-sans text-sm font-medium text-[#64748b]">Pending Clearance</p>
              <p className="mt-2 font-sans text-[30px] leading-9 font-bold text-[#1e293b]">$850.00</p>
              <p className="mt-2 font-sans text-xs font-medium text-[#64748b]">From 2 recent projects</p>
            </article>
            <article className="rounded-xl border border-[#e2e8f0] bg-white px-6 pt-6 pb-9">
              <p className="font-sans text-sm font-medium text-[#64748b]">Total Paid Out</p>
              <p className="mt-2 font-sans text-[30px] leading-9 font-bold text-[#1e293b]">$12,450.00</p>
              <p className="mt-2 font-sans text-xs font-medium text-[#64748b]">Lifetime earnings</p>
            </article>
            <article className="rounded-xl border border-[#e2e8f0] bg-white px-6 pt-6 pb-9">
              <p className="font-sans text-sm font-medium text-[#64748b]">Next Payout Date</p>
              <p className="mt-2 font-sans text-xl font-bold text-[#1e293b]">Nov 15, 2023</p>
              <p className="mt-2 font-sans text-xs font-medium text-[#1e293b]">Chase Bank ****4589</p>
            </article>
          </div>

          <section className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
            <div className="flex flex-col gap-4 border-b border-[#e2e8f0] px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="font-sans text-lg font-semibold text-[#1e293b]">Transaction History</h2>
              <div className="flex flex-wrap items-center gap-3">
                <label className="relative min-w-[180px] flex-1">
                  <span className="sr-only">Search transactions</span>
                  <FigmaAsset
                    src="/images/icon-search.svg"
                    alt=""
                    className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2"
                  />
                  <input
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Search transactions..."
                    className="h-9 w-full rounded-lg border border-[#e2e8f0] bg-white py-2 pr-3 pl-9 font-sans text-sm outline-none placeholder:text-[#9ca3af]"
                  />
                </label>
                <label className="sr-only" htmlFor="payout-type">
                  All Types
                </label>
                <select
                  id="payout-type"
                  value={typeFilter}
                  onChange={(event) => setTypeFilter(event.target.value)}
                  className="h-9 rounded-lg border border-[#e2e8f0] bg-white px-3 font-sans text-sm text-[#1e293b]"
                >
                  <option value="all">All Types</option>
                  <option value="earning">Earning</option>
                  <option value="withdrawal">Withdrawal</option>
                </select>
                <label className="sr-only" htmlFor="payout-status">
                  All Statuses
                </label>
                <select
                  id="payout-status"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-9 rounded-lg border border-[#e2e8f0] bg-white px-3 font-sans text-sm text-[#1e293b]"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="pending">Pending</option>
                </select>
                <label className="sr-only" htmlFor="payout-range">
                  Date range
                </label>
                <select
                  id="payout-range"
                  value={range}
                  onChange={(event) => setRange(event.target.value)}
                  className="h-9 rounded-lg border border-[#e2e8f0] bg-white px-3 font-sans text-sm text-[#1e293b]"
                >
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[960px] w-full text-left">
                <thead className="border-b border-[#e2e8f0]">
                  <tr className="font-sans text-xs font-bold tracking-wide text-[#64748b]">
                    <th className="px-4 py-3">DATE</th>
                    <th className="px-4 py-3">DESCRIPTION</th>
                    <th className="px-4 py-3">TYPE</th>
                    <th className="px-4 py-3">STATUS</th>
                    <th className="px-4 py-3">AMOUNT</th>
                    <th className="px-4 py-3">FEE</th>
                    <th className="px-4 py-3">NET</th>
                    <th className="px-4 py-3">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((row) => (
                    <tr key={row.id} className="border-b border-[#e2e8f0] last:border-0">
                      <td className="px-4 py-4 font-sans text-sm font-medium whitespace-nowrap text-[#1e293b]">
                        {row.date}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-sans text-sm font-medium text-[#1e293b]">{row.title}</p>
                        <p className="font-sans text-xs text-[#64748b]">{row.subtitle}</p>
                      </td>
                      <td className="px-4 py-4 font-sans text-sm text-[#64748b]">
                        {row.type === "earning" ? "Earning" : "Withdrawal"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-md px-2.5 py-1 font-sans text-xs font-medium ${statusClass[row.status]}`}
                        >
                          {statusLabel[row.status]}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-sans text-sm font-medium text-[#1e293b]">{row.amount}</td>
                      <td
                        className={`px-4 py-4 font-sans text-sm ${
                          row.feeTone === "red" ? "text-[#ef4444]" : "text-[#64748b]"
                        }`}
                      >
                        {row.fee}
                      </td>
                      <td className="px-4 py-4 font-sans text-sm font-semibold text-[#1e293b]">{row.net}</td>
                      <td className="px-4 py-4">
                        <UnavailableControl
                          aria-label={`Download details for ${row.title}`}
                          className="text-[#64748b]"
                          reason="Transaction download is not connected."
                        >
                          <FigmaAsset src="/images/hiw-download.svg" alt="" className="size-4" />
                        </UnavailableControl>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f9fafb] px-6 py-4">
              <p className="font-sans text-sm text-[#64748b]">
                Showing 1 to {visible.length} of 24 transactions
              </p>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={`flex size-8 items-center justify-center rounded-md font-sans text-sm font-medium ${
                      page === n ? "bg-[#9b82f3] text-white" : "text-[#1e293b]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <span className="px-1 font-sans text-base text-[#64748b]">...</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
