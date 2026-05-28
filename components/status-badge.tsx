const styles: Record<string, string> = {
  Draft: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  Prepared: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  "Pending Branch Approval": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Approved by Branch": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Sealed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Assigned to CIT": "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  "Picked Up by CIT": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  "In Transit": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "Arrived at CBI Gate": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  "Received by CBI Cash Desk": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Pending CBI Approval": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Accepted for Counting": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  "Opened for Verification": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "Counting in Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Matched: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Discrepancy Found": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  "Pending Bank Response": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  Resolved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  Closed: "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] ?? styles.Draft}`}>
      {status}
    </span>
  );
}
