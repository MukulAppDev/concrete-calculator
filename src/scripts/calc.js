// Pure calculation functions for concrete & gravel estimating.
// All dimension inputs are in feet (converted before calling).
// All volume outputs are in cubic feet unless noted.

export const CUBIC_FEET_PER_YARD = 27
export const BAG_YIELD_60 = 0.45 // ft³ per 60 lb bag
export const BAG_YIELD_80 = 0.6 // ft³ per 80 lb bag
export const GRAVEL_TONS_PER_YARD = 1.4 // approx. tons per cubic yard

/** Convert a value in the given unit to feet. */
export function toFeet(value, unit) {
  if (unit === 'in') return value / 12
  if (unit === 'yd') return value * 3
  return value
}

/** Slab / rectangular pad: length × width × thickness (all ft). */
export function slabVolume(length, width, thickness) {
  return length * width * thickness
}

/** Footing: treated as a long rectangular prism (all ft). */
export function footingVolume(length, width, depth) {
  return length * width * depth
}

/** Round column / pier: diameter and height in ft, times quantity. */
export function columnVolume(diameter, height, quantity) {
  const r = diameter / 2
  return Math.PI * r * r * height * Math.max(1, quantity)
}

/**
 * Stairs poured as a solid monolith against a wall.
 * Each step i (1-based) is a slab of full width, tread depth,
 * and cumulative height i × rise.
 */
export function stairsVolume(width, rise, run, steps) {
  let total = 0
  for (let i = 1; i <= steps; i++) {
    total += width * run * (rise * i)
  }
  return total
}

/** Gravel base: same prism math as a slab. */
export function gravelVolume(length, width, depth) {
  return length * width * depth
}

/** Apply waste factor (percent, e.g. 10) to a volume. */
export function withWaste(volumeFt3, wastePercent) {
  return volumeFt3 * (1 + wastePercent / 100)
}

export function cubicFeetToYards(ft3) {
  return ft3 / CUBIC_FEET_PER_YARD
}

export function bags60(ft3) {
  return Math.ceil(ft3 / BAG_YIELD_60)
}

export function bags80(ft3) {
  return Math.ceil(ft3 / BAG_YIELD_80)
}

export function gravelTons(ft3) {
  return cubicFeetToYards(ft3) * GRAVEL_TONS_PER_YARD
}

/** Format a number with commas and up to `dp` decimals. */
export function fmt(n, dp = 2) {
  if (!isFinite(n)) return '—'
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: dp,
  })
}

export function fmtCurrency(n) {
  if (!isFinite(n)) return '—'
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

/**
 * Validate a raw input value. Returns { ok, value, error }.
 * Empty strings are treated as "not yet entered" (ok: false, no error).
 */
export function parseDim(raw, { min = 0.001, max = 100000 } = {}) {
  if (raw === '' || raw === null || raw === undefined) {
    return { ok: false, value: 0, error: null }
  }
  const v = Number(raw)
  if (!isFinite(v)) return { ok: false, value: 0, error: 'Enter a number' }
  if (v <= 0) return { ok: false, value: 0, error: 'Must be greater than 0' }
  if (v < min) return { ok: false, value: v, error: 'Value too small' }
  if (v > max) return { ok: false, value: v, error: 'Value too large' }
  return { ok: true, value: v, error: null }
}
