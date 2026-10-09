"use client";

import React, { useState } from "react";
import { DollarSign, Receipt, CreditCard, Users, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<"invoices" | "payroll">("invoices");

  const invoices = [
    { id: "INV-2026-081", student: "Julian Voss", grade: "Grade 11", amount: "$8,500.00", dueDate: "Oct 15, 2026", status: "PAID", channel: "Online NetBanking" },
    { id: "INV-2026-082", student: "Sophia Chen", grade: "Grade 11", amount: "$8,500.00", dueDate: "Oct 15, 2026", status: "PAID", channel: "Credit Card Gateway" },
    { id: "INV-2026-083", student: "Liam O'Connor", grade: "Grade 10", amount: "$7,200.00", dueDate: "Oct 15, 2026", status: "PENDING", channel: "Awaiting Cheque Clear" },
    { id: "INV-2026-084", student: "Mateo Alvarez", grade: "Grade 9", amount: "$7,200.00", dueDate: "Sep 30, 2026", status: "OVERDUE", channel: "Installment Reminder Sent" },
  ];

  const payroll = [
    { id: "PAY-OCT-01", employee: "Dr. Arthur Vance", role: "Head of School", gross: "$12,500.00", deductions: "$2,100.00", net: "$10,400.00", status: "READY" },
    { id: "PAY-OCT-02", employee: "Sarah Lin", role: "Academic Coordinator", gross: "$9,200.00", deductions: "$1,450.00", net: "$7,750.00", status: "READY" },
    { id: "PAY-OCT-03", employee: "Marcus Brody", role: "Senior Physics Faculty", gross: "$8,400.00", deductions: "$1,300.00", net: "$7,100.00", status: "READY" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            Financial Management & Payroll Operations
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tuition fee invoicing, multi-channel payment receipts, and automated staff payroll (BE-4).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-3.5 h-3.5 mr-1" /> Export Audit Ledger
          </Button>
          <Button variant="primary" size="sm">
            + Generate Term Invoices
          </Button>
        </div>
      </div>

      {/* Financial Metrics Cards (Invoicely Enterprise Design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Tuition Collections Target
          </span>
          <div className="text-2xl font-black font-display text-slate-900">$4,500,000.00</div>
          <span className="text-xs text-slate-500 font-medium">AY 2026–27 Annual Target</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Collected Realized
          </span>
          <div className="text-2xl font-black font-display text-[#007f57]">$3,890,250.00</div>
          <span className="text-xs font-semibold text-emerald-600">86.4% Completion Rate</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Outstanding Arrears
          </span>
          <div className="text-2xl font-black font-display text-[#ba1a1a]">$609,750.00</div>
          <span className="text-xs text-red-600 font-semibold">14 Defaulter Accounts</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Monthly Payroll Outflow
          </span>
          <div className="text-2xl font-black font-display text-[#712ae2]">$285,400.00</div>
          <span className="text-xs text-slate-500 font-medium">98 Staff Members Covered</span>
        </Card>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("invoices")}
          className={`py-3 px-6 text-xs font-bold transition-all border-b-2 ${
            activeTab === "invoices"
              ? "border-[#004bca] text-[#004bca]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Fee Invoices & Student Accounts
        </button>
        <button
          onClick={() => setActiveTab("payroll")}
          className={`py-3 px-6 text-xs font-bold transition-all border-b-2 ${
            activeTab === "payroll"
              ? "border-[#004bca] text-[#004bca]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Faculty & Staff Payroll Register
        </button>
      </div>

      {activeTab === "invoices" ? (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Invoice Number</th>
                  <th className="py-3.5 px-6">Student & Grade</th>
                  <th className="py-3.5 px-6">Due Date</th>
                  <th className="py-3.5 px-6">Payment Channel</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-[#004bca]">{inv.id}</td>
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {inv.student}
                      <span className="block text-[10px] text-slate-400 font-normal">{inv.grade}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{inv.dueDate}</td>
                    <td className="py-4 px-6 text-slate-600">{inv.channel}</td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">{inv.amount}</td>
                    <td className="py-4 px-6 text-right">
                      <Badge variant={inv.status === "PAID" ? "success" : inv.status === "PENDING" ? "warning" : "danger"}>
                        {inv.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Payroll Batch</th>
                  <th className="py-3.5 px-6">Employee & Designation</th>
                  <th className="py-3.5 px-6">Gross Pay</th>
                  <th className="py-3.5 px-6">Statutory Deductions</th>
                  <th className="py-3.5 px-6">Net Disbursement</th>
                  <th className="py-3.5 px-6 text-right">Disbursement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payroll.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-purple-700">{pay.id}</td>
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {pay.employee}
                      <span className="block text-[10px] text-slate-400 font-normal">{pay.role}</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-700">{pay.gross}</td>
                    <td className="py-4 px-6 font-mono text-red-600">{pay.deductions}</td>
                    <td className="py-4 px-6 font-mono font-bold text-[#007f57]">{pay.net}</td>
                    <td className="py-4 px-6 text-right">
                      <Badge variant="success">Disbursement Scheduled</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
