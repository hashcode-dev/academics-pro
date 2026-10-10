"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Receipt,
  CreditCard,
  Users,
  Download,
  AlertCircle,
  CheckCircle2,
  Plus,
  X,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { fetchJson } from "@/lib/api";
import { FinancialMetric } from "@/lib/types";

interface InvoiceItem {
  id: string;
  invoiceNumber?: string;
  student: string;
  studentName?: string;
  grade: string;
  amount: string;
  amountDue?: number;
  amountPaid?: number;
  balance?: number;
  dueDate: string;
  status: "PAID" | "PENDING" | "OVERDUE";
  channel: string;
}

interface PayrollItem {
  id: string;
  employee: string;
  role: string;
  gross: string;
  deductions: string;
  net: string;
  status: string;
}

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<"invoices" | "payroll">("invoices");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const [metrics, setMetrics] = useState<FinancialMetric>({
    totalFeeTarget: 4500000,
    collectedFees: 3890250,
    pendingFees: 609750,
    collectionRatePercentage: 86.45,
    monthlyPayrollDisbursed: 285400,
    defaultersCount: 14,
  });

  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    { id: "INV-2026-081", student: "Julian Voss", grade: "Grade 11", amount: "$8,500.00", amountDue: 8500, amountPaid: 8500, balance: 0, dueDate: "Oct 15, 2026", status: "PAID", channel: "Online NetBanking" },
    { id: "INV-2026-082", student: "Sophia Chen", grade: "Grade 11", amount: "$8,500.00", amountDue: 8500, amountPaid: 8500, balance: 0, dueDate: "Oct 15, 2026", status: "PAID", channel: "Credit Card Gateway" },
    { id: "INV-2026-083", student: "Liam O'Connor", grade: "Grade 10", amount: "$7,200.00", amountDue: 7200, amountPaid: 0, balance: 7200, dueDate: "Oct 15, 2026", status: "PENDING", channel: "Awaiting Cheque Clear" },
    { id: "INV-2026-084", student: "Mateo Alvarez", grade: "Grade 9", amount: "$7,200.00", amountDue: 7200, amountPaid: 1500, balance: 5700, dueDate: "Sep 30, 2026", status: "OVERDUE", channel: "Installment Reminder Sent" },
  ]);

  const [payroll, setPayroll] = useState<PayrollItem[]>([
    { id: "PAY-OCT-01", employee: "Dr. Arthur Vance", role: "Head of School", gross: "$12,500.00", deductions: "$2,100.00", net: "$10,400.00", status: "READY" },
    { id: "PAY-OCT-02", employee: "Sarah Lin", role: "Academic Coordinator", gross: "$9,200.00", deductions: "$1,450.00", net: "$7,750.00", status: "READY" },
    { id: "PAY-OCT-03", employee: "Marcus Brody", role: "Senior Physics Faculty", gross: "$8,400.00", deductions: "$1,300.00", net: "$7,100.00", status: "READY" },
    { id: "PAY-OCT-04", employee: "Dr. Elena Rostova", role: "Director of Finance", gross: "$9,800.00", deductions: "$1,550.00", net: "$8,250.00", status: "READY" },
  ]);

  // Modal states
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isGenerateInvoicesOpen, setIsGenerateInvoicesOpen] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    invoiceId: "INV-2026-083",
    amount: "7200",
    channel: "Credit Card Gateway",
    reference: `TXN-${Math.floor(Math.random() * 900000 + 100000)}`,
  });

  const [generateForm, setGenerateForm] = useState({
    termName: "Spring Term 2",
    academicYear: "AY 2026–2027",
    tuitionRate: "8500",
    cohort: "All Enrolled Students",
  });

  useEffect(() => {
    fetchJson<FinancialMetric>("/finance/summary")
      .then((data) => {
        if (data && data.totalFeeTarget) {
          setMetrics(data);
        }
      })
      .catch((err) => console.warn("Using fallback finance summary:", err));

    fetchJson<InvoiceItem[]>("/finance/invoices")
      .then((data) => {
        if (data && data.length > 0) {
          setInvoices(data);
        }
      })
      .catch((err) => console.warn("Using fallback finance invoices:", err));

    fetchJson<PayrollItem[]>("/finance/payroll")
      .then((data) => {
        if (data && data.length > 0) {
          setPayroll(data);
        }
      })
      .catch((err) => console.warn("Using fallback payroll:", err));
  }, []);

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payAmount = Number(paymentForm.amount);
      await fetchJson("/finance/payments", {
        method: "POST",
        body: JSON.stringify(paymentForm),
      });

      setInvoices((prev) =>
        prev.map((inv) => {
          if (inv.id === paymentForm.invoiceId) {
            return {
              ...inv,
              status: "PAID",
              channel: paymentForm.channel,
              amountPaid: (inv.amountPaid || 0) + payAmount,
              balance: 0,
            };
          }
          return inv;
        })
      );

      setMetrics((prev) => ({
        ...prev,
        collectedFees: prev.collectedFees + payAmount,
        pendingFees: Math.max(0, prev.pendingFees - payAmount),
        collectionRatePercentage: Number(
          (((prev.collectedFees + payAmount) / prev.totalFeeTarget) * 100).toFixed(2)
        ),
      }));

      setIsPaymentModalOpen(false);
      setNotification(
        `Payment of $${payAmount.toLocaleString()} recorded for ${paymentForm.invoiceId} via ${paymentForm.channel} (Ref: ${paymentForm.reference}).`
      );
      setTimeout(() => setNotification(null), 5000);
    } catch (err) {
      console.error("Failed to record payment:", err);
    }
  };

  const handleGenerateInvoices = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newInvNumber = `INV-2026-0${invoices.length + 85}`;
      const newInv: InvoiceItem = {
        id: newInvNumber,
        invoiceNumber: newInvNumber,
        student: "Amara Patel",
        grade: "Grade 12",
        amount: `$${Number(generateForm.tuitionRate).toLocaleString()}.00`,
        amountDue: Number(generateForm.tuitionRate),
        amountPaid: 0,
        balance: Number(generateForm.tuitionRate),
        dueDate: "Nov 15, 2026",
        status: "PENDING",
        channel: "Direct Debit Mandate",
      };

      setInvoices((prev) => [newInv, ...prev]);
      setMetrics((prev) => ({
        ...prev,
        totalFeeTarget: prev.totalFeeTarget + Number(generateForm.tuitionRate),
        pendingFees: prev.pendingFees + Number(generateForm.tuitionRate),
      }));

      setIsGenerateInvoicesOpen(false);
      setNotification(
        `Term invoice ${newInvNumber} generated for ${generateForm.termName} (${generateForm.academicYear}).`
      );
      setTimeout(() => setNotification(null), 5000);
    } catch (err) {
      console.error("Failed to generate invoices:", err);
    }
  };

  const handleExportLedger = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Invoice,Student,Grade,Due Date,Amount,Status,Channel"]
        .concat(
          invoices.map(
            (i) => `${i.id},${i.student},${i.grade},${i.dueDate},${i.amount},${i.status},${i.channel}`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "AcademicsPro_Financial_Ledger_AY2627.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotification("General Ledger & Payment Audit exported to AcademicsPro_Financial_Ledger_AY2627.csv");
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesStatus = statusFilter === "ALL" || inv.status === statusFilter;
    const matchesSearch =
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.channel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm transition-all animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-500 hover:text-emerald-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
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
          <Button variant="outline" size="sm" onClick={handleExportLedger}>
            <Download className="w-3.5 h-3.5 mr-1" /> Export Audit Ledger
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setIsPaymentModalOpen(true)}>
            <Receipt className="w-3.5 h-3.5 mr-1" /> + Record Payment
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsGenerateInvoicesOpen(true)}>
            <Plus className="w-3.5 h-3.5 mr-1" /> + Generate Term Invoices
          </Button>
        </div>
      </div>

      {/* Financial Metrics Cards (Invoicely Enterprise Design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Tuition Collections Target
          </span>
          <div className="text-2xl font-black font-display text-slate-900">
            ${metrics.totalFeeTarget.toLocaleString()}.00
          </div>
          <span className="text-xs text-slate-500 font-medium">AY 2026–27 Annual Target</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Collected Realized
          </span>
          <div className="text-2xl font-black font-display text-[#007f57]">
            ${metrics.collectedFees.toLocaleString()}.00
          </div>
          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3.5 h-3.5" /> {metrics.collectionRatePercentage}% Completion Rate
          </span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Outstanding Arrears
          </span>
          <div className="text-2xl font-black font-display text-[#ba1a1a]">
            ${metrics.pendingFees.toLocaleString()}.00
          </div>
          <span className="text-xs text-red-600 font-semibold">
            {metrics.defaultersCount} Accounts in Follow-up
          </span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Monthly Payroll Outflow
          </span>
          <div className="text-2xl font-black font-display text-[#712ae2]">
            ${metrics.monthlyPayrollDisbursed.toLocaleString()}.00
          </div>
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
          Fee Invoices & Student Accounts ({invoices.length})
        </button>
        <button
          onClick={() => setActiveTab("payroll")}
          className={`py-3 px-6 text-xs font-bold transition-all border-b-2 ${
            activeTab === "payroll"
              ? "border-[#004bca] text-[#004bca]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Faculty & Staff Payroll Register ({payroll.length})
        </button>
      </div>

      {activeTab === "invoices" ? (
        <div className="space-y-4">
          {/* Invoices Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search invoice number, student, grade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Status:</span>
              {["ALL", "PAID", "PENDING", "OVERDUE"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === st
                      ? "bg-[#004bca] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <Card className="p-0 overflow-hidden border-slate-200">
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
                  {filteredInvoices.map((inv) => (
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
                        <Badge
                          variant={
                            inv.status === "PAID"
                              ? "success"
                              : inv.status === "PENDING"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {inv.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredInvoices.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No invoices found matching the specified filters.
              </div>
            )}
          </Card>
        </div>
      ) : (
        <Card className="p-0 overflow-hidden border-slate-200">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              October 2026 Academic Payroll Batch (AY 2026–2027)
            </span>
            <Badge variant="success">Statutory Compliance Verified</Badge>
          </div>

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

      {/* Record Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Record Student Fee Payment Receipt
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update invoice status and reconcile student ledger accounts.
                </p>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Target Invoice</label>
                <select
                  value={paymentForm.invoiceId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, invoiceId: e.target.value })}
                  className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004bca]"
                >
                  {invoices.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.id} — {inv.student} ({inv.amount}) [{inv.status}]
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Receipt Amount ($)</label>
                  <Input
                    type="number"
                    required
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                    className="text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Channel</label>
                  <select
                    value={paymentForm.channel}
                    onChange={(e) => setPaymentForm({ ...paymentForm, channel: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004bca]"
                  >
                    <option value="Credit Card Gateway">Credit Card Gateway</option>
                    <option value="Online NetBanking">Online NetBanking</option>
                    <option value="Direct Debit Mandate">Direct Debit Mandate</option>
                    <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                    <option value="Cash / Cheque Receipt">Cash / Cheque Receipt</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Transaction Reference</label>
                <Input
                  required
                  placeholder="e.g. TXN-849201"
                  value={paymentForm.reference}
                  onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })}
                  className="text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPaymentModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Record & Issue Receipt
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generate Invoices Modal */}
      {isGenerateInvoicesOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Generate Academic Term Fee Invoices
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Batch tuition invoice provisioning for enrolled cohorts.
                </p>
              </div>
              <button
                onClick={() => setIsGenerateInvoicesOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateInvoices} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Term</label>
                  <Input
                    required
                    value={generateForm.termName}
                    onChange={(e) => setGenerateForm({ ...generateForm, termName: e.target.value })}
                    className="text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                  <Input
                    required
                    value={generateForm.academicYear}
                    onChange={(e) => setGenerateForm({ ...generateForm, academicYear: e.target.value })}
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tuition Rate ($)</label>
                  <Input
                    type="number"
                    required
                    value={generateForm.tuitionRate}
                    onChange={(e) => setGenerateForm({ ...generateForm, tuitionRate: e.target.value })}
                    className="text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Cohort</label>
                  <select
                    value={generateForm.cohort}
                    onChange={(e) => setGenerateForm({ ...generateForm, cohort: e.target.value })}
                    className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004bca]"
                  >
                    <option value="All Enrolled Students">All Enrolled Students</option>
                    <option value="Grade 11 & 12 (Senior IB DP)">Grade 11 & 12 (Senior IB DP)</option>
                    <option value="Grade 9 & 10 (Middle Years)">Grade 9 & 10 (Middle Years)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsGenerateInvoicesOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Run Term Invoice Batch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
