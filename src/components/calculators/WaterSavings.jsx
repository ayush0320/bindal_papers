import React, { useMemo, useState } from "react";
import { WATER_DEFAULTS, CONVERSIONS } from "../../constants/sustainability";

function numberOr(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
}

function formatCurrencyINR(n) {
    if (!Number.isFinite(n)) return "₹0";
    try {
        return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
    } catch {
        return `₹${Math.round(n).toLocaleString("en-IN")}`;
    }
}

function formatNumber(n, fractionDigits = 0) {
    if (!Number.isFinite(n)) return "0";
    return n.toLocaleString("en-IN", { maximumFractionDigits: fractionDigits });
}

export default function WaterSavings() {
    const [inputs, setInputs] = useState({
        roCapacityMld: WATER_DEFAULTS.roCapacityMld,
        roRecoveryPct: WATER_DEFAULTS.roRecoveryPct,
        reusePct: WATER_DEFAULTS.reusePct,
        operatingDays: WATER_DEFAULTS.operatingDays,
        waterCostPerM3: WATER_DEFAULTS.waterCostPerM3,
    });

    const update = (key) => (e) => {
        const value = e.target.value;
        setInputs((prev) => ({ ...prev, [key]: value }));
    };

    const calc = useMemo(() => {
        const roCapacityMld = Math.max(0, numberOr(inputs.roCapacityMld, WATER_DEFAULTS.roCapacityMld));
        const roRecovery = Math.min(100, Math.max(0, numberOr(inputs.roRecoveryPct, WATER_DEFAULTS.roRecoveryPct))) / 100;
        const reuse = Math.min(100, Math.max(0, numberOr(inputs.reusePct, WATER_DEFAULTS.reusePct))) / 100;
        const days = Math.max(0, numberOr(inputs.operatingDays, WATER_DEFAULTS.operatingDays));
        const costPerM3 = Math.max(0, numberOr(inputs.waterCostPerM3, WATER_DEFAULTS.waterCostPerM3));

        const permeatePerDay_m3 = roCapacityMld * CONVERSIONS.mldToM3PerDay * roRecovery;
        const recycledPerDay_m3 = permeatePerDay_m3 * reuse;
        const recycledPerYear_m3 = recycledPerDay_m3 * days;

        const poolsPerYear = recycledPerYear_m3 / CONVERSIONS.olympicPoolM3;
        const trucksPerDay = recycledPerDay_m3 / CONVERSIONS.tankerTruckM3;
        const trucksPerYear = recycledPerYear_m3 / CONVERSIONS.tankerTruckM3;

        const costSavingsPerYear = recycledPerYear_m3 * costPerM3;

        return {
            roCapacityMld,
            roRecovery,
            reuse,
            days,
            costPerM3,
            permeatePerDay_m3,
            recycledPerDay_m3,
            recycledPerYear_m3,
            poolsPerYear,
            trucksPerDay,
            trucksPerYear,
            costSavingsPerYear,
        };
    }, [inputs]);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Water Savings Calculator (ZLD/RO)</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Estimate recycled water and potential freshwater cost savings based on RO capacity and reuse assumptions.
                </p>
            </header>

            <section aria-label="Inputs" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Field
                    label="RO plant capacity"
                    id="roCapacityMld"
                    suffix="MLD"
                    value={inputs.roCapacityMld}
                    onChange={update("roCapacityMld")}
                    type="number"
                    step="0.1"
                    min="0"
                    helper="Default: 4.4 MLD"
                />
                <Field
                    label="RO recovery"
                    id="roRecoveryPct"
                    suffix="%"
                    value={inputs.roRecoveryPct}
                    onChange={update("roRecoveryPct")}
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    helper="Typical range: 70–90%"
                />
                <Field
                    label="Reuse rate of permeate"
                    id="reusePct"
                    suffix="%"
                    value={inputs.reusePct}
                    onChange={update("reusePct")}
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    helper="Share of permeate reused in process"
                />
                <Field
                    label="Operating days per year"
                    id="operatingDays"
                    suffix="days"
                    value={inputs.operatingDays}
                    onChange={update("operatingDays")}
                    type="number"
                    step="1"
                    min="0"
                    max="366"
                />
                <Field
                    label="Freshwater cost"
                    id="waterCostPerM3"
                    prefix="₹"
                    suffix="/m³"
                    value={inputs.waterCostPerM3}
                    onChange={update("waterCostPerM3")}
                    type="number"
                    step="1"
                    min="0"
                    helper="Estimated landed cost of water"
                />
            </section>

            <section aria-label="Key Results" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Stat
                    label="Recycled water / day"
                    value={`${formatNumber(calc.recycledPerDay_m3, 0)} m³`}
                    sub={`${formatNumber(calc.trucksPerDay, 0)} tanker trucks/day`}
                />
                <Stat
                    label="Recycled water / year"
                    value={`${formatNumber(calc.recycledPerYear_m3, 0)} m³`}
                    sub={`${formatNumber(calc.poolsPerYear, 1)} Olympic pools/year`}
                />
                <Stat
                    label="Cost savings / year"
                    value={formatCurrencyINR(calc.costSavingsPerYear)}
                    sub={`${formatNumber(calc.days, 0)} operating days`}
                />
            </section>

            <section aria-label="Details" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Detail
                    label="Permeate produced / day"
                    value={`${formatNumber(calc.permeatePerDay_m3, 0)} m³`}
                    hint={`= RO capacity (MLD) × 1000 × recovery (${Math.round(calc.roRecovery * 100)}%)`}
                />
                <Detail
                    label="Tanker trucks / year"
                    value={`${formatNumber(calc.trucksPerYear, 0)} trucks`}
                    hint="Assuming 10 m³ per truck"
                />
            </section>

            <section className="bg-blue-50 border border-blue-100 rounded-md p-4 text-sm text-blue-900">
                <p className="font-medium">Notes</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>1 MLD = 1,000 m³/day. Olympic pool ≈ 2,500 m³; tanker truck ≈ 10 m³.</li>
                    <li>Actual performance depends on feed water quality, membrane condition, and reuse patterns.</li>
                    <li>This tool is for estimation and communication; it is not a compliance or financial guarantee.</li>
                </ul>
            </section>
        </div>
    );
}

function Field({ id, label, value, onChange, type = "text", prefix, suffix, helper, ...rest }) {
    return (
        <div className="block">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                {prefix ? (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">{prefix}</span>
                    </div>
                ) : null}
                <input
                    id={id}
                    className={`block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${prefix ? "pl-7" : ""
                        } ${suffix ? "pr-12" : ""}`}
                    type={type}
                    value={value}
                    onChange={onChange}
                    inputMode={type === "number" ? "decimal" : undefined}
                    {...rest}
                />
                {suffix ? (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm">{suffix}</span>
                    </div>
                ) : null}
            </div>
            {helper ? <p className="mt-1 text-xs text-gray-500">{helper}</p> : null}
        </div>
    );
}

function Stat({ label, value, sub }) {
    return (
        <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            <div className="text-xs uppercase tracking-wider text-gray-500">{label}</div>
            <div className="mt-1 text-xl font-semibold text-gray-900">{value}</div>
            {sub ? <div className="mt-1 text-xs text-gray-500">{sub}</div> : null}
        </div>
    );
}

function Detail({ label, value, hint }) {
    return (
        <div className="p-4 bg-white rounded-md border border-gray-200">
            <div className="text-sm text-gray-600">{label}</div>
            <div className="mt-1 text-lg font-medium text-gray-900">{value}</div>
            {hint ? <div className="mt-1 text-xs text-gray-500">{hint}</div> : null}
        </div>
    );
}