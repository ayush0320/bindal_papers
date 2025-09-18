export const WATER_DEFAULTS = {
    roCapacityMld: 4.4,       // RO plant capacity in MLD
    roRecoveryPct: 85,        // % of feed water recovered as permeate
    reusePct: 95,             // % of permeate reused in process
    operatingDays: 330,       // days/year plant operates
    waterCostPerM3: 40,       // ₹ per m³ of freshwater
};

export const CONVERSIONS = {
    mldToM3PerDay: 1000,      // 1 MLD = 1000 m³/day
    olympicPoolM3: 2500,      // approx. volume of an Olympic-size pool
    tankerTruckM3: 10,        // 10,000 liters per truck ≈ 10 m³
};