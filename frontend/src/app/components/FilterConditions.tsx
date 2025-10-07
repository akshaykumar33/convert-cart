import React, { useState } from "react";
import { FilterIcon, RotateCcw } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export function FilterConditions({
  onEvaluate,
  loading: externalLoading = false,
}: {
  onEvaluate?: (rules: string[]) => Promise<void>;
  loading?: boolean;
}) {
   const initialValues ="price > 400\ncategory = Jackets\nstock_status = instock\nbrand != Samsung\nrating >= 4.0";

  const [rules, setRules] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handles the button click and disables interactions while loading
  const handleEvaluate = async () => {
    setLoading(true);
    setError(null);
    try {
      const conditions = rules.split("\n").map((s) => s.trim()).filter(Boolean);
      if (onEvaluate) {
        await onEvaluate(conditions);
      }
    } catch (e: any) {
      setError(e?.message || "Unexpected error during evaluation.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRules(initialValues);
    setError(null);
  };

  // Always use &gt; or &lt; and similar for HTML entities!
  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Define Filter Conditions</h2>
        <label htmlFor="filter-rules" className="block text-sm font-medium text-gray-600 mb-2">
          Enter filter rules (one per line):
        </label>
        <textarea
          id="filter-rules"
          className="w-full  rounded-lg border border-gray-300 px-3 py-2 text-gray-400 bg-gray-50 outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          value={rules}
          onChange={(e) => setRules(e.target.value)}
          rows={10}
          disabled={loading || externalLoading}
          style={{ resize: "none",overflow:"hidden" }}
        />
        <br/>
        <p className="mt-2 text-sm text-gray-500">
          Examples: price &gt; 5000, category = Smartphones, stock_status = instock
        </p>
        <div className="flex items-center mt-6 gap-2">
          <button
            onClick={handleEvaluate}
            disabled={loading || externalLoading || !rules.trim()}
            className="flex-1 flex justify-center items-center p-4 rounded-md text-white font-medium bg-gray-900 hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            type="button"
          >
            <FilterIcon className="mr-2 h-5 w-5" />
            {loading || externalLoading ? "Evaluating..." : "Evaluate Filter"}
          </button>
          <button
            onClick={handleReset}
            disabled={loading || externalLoading}
            className="flex items-center justify-center p-4 w-1/4 rounded-md border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
            type="button"
          >
            <RotateCcw className="mr-2 h-5 w-5" /> Reset
          </button>
        </div>
        {error && (
          <div className="mt-3 text-red-600 font-medium">{error}</div>
        )}
        <br/>
<div className="mt-7 rounded-[10px] border border-gray-200 bg-[#FAFBFC] px-6 py-4 flex items-start">
      <span className="pt-[2.5px] mr-3">
        <FontAwesomeIcon icon={faInfoCircle} className="text-gray-400" size="lg" />
      </span>
      <div>
        <span className="block font-medium text-gray-700 text-[18px]" style={{ fontFamily: "Inter, Arial, sans-serif" }}>
          Supported operators:
        </span>
        <div className="mt-1 flex gap-7 text-[18px] leading-[25px] font-mono tracking-wide text-gray-700" style={{ fontFamily: "Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
          <span>=</span>
          <span>!=</span>
          <span>&gt;</span>
          <span>&lt;</span>
          <span>&gt;=</span>
          <span>&lt;=</span>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}
