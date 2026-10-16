import { Cpu } from "lucide-react";

export const AIModelPicker = ({ models, value, onChange }) => (
  <div data-testid="ai-model-picker" className="space-y-2">
    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5A6472]">
      <Cpu className="w-3.5 h-3.5" /> AI model
    </div>
    <div className="grid gap-2">
      {models.map((m) => {
        const active = value === m.id;
        return (
          <button
            key={m.id}
            type="button"
            data-testid={`ai-model-option-${m.id}`}
            disabled={!m.available}
            onClick={() => onChange(m.id)}
            className={`tv-panel text-left px-3 py-2.5 transition-[border-color,background-color] duration-150 ${
              active ? "!border-[#2486C7] bg-[#F2F8FC]" : "hover:border-[#2486C7]"
            } ${m.available ? "" : "opacity-60 cursor-not-allowed"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#0B0F14]">{m.name}</span>
              <span className="text-[10px] font-mono uppercase text-[#5A6472]">{m.provider}</span>
            </div>
            {m.status && (
              <p data-testid={`ai-model-status-${m.id}`} className="mt-1 text-xs text-amber-700">
                {m.status}
              </p>
            )}
          </button>
        );
      })}
    </div>
  </div>
);
