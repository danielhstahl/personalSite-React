import type { ColProps } from 'antd'

/**
 * Shared antd `Form` grid configuration.
 *
 * These were previously fixed at `{ span: 12 }` for both columns, with the
 * submit row aligning itself via `offset: LABEL_COL.span`. At desktop widths
 * that looks tidy, but the fixed values broke narrow screens: 12-of-24 leaves
 * only ~160px per column at 375px, and the unconditional `offset: 12` shoved
 * the submit row out to 465px inside a 375px viewport.
 *
 * `ColProps` accepts a per-breakpoint `ColSize` object (which carries its own
 * `offset`), so the layout can be responsive without any CSS override:
 *   - below `sm`: label and control each take the full row (stacked), offset 0
 *   - `sm` and up: the original 12/12 side-by-side layout, unchanged
 */

/** Label column: stacked full width on phones, half width from `sm` up. */
export const LABEL_COL: ColProps = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 0 },
}

/** Control column: pairs with `LABEL_COL`. */
export const WRAPPER_COL: ColProps = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 0 },
}

/**
 * Wrapper for a row whose control should line up with the inputs above it
 * (i.e. the submit button under its fields).
 *
 * Replaces the hand-written `wrapperCol={{ offset: LABEL_COL.span, span:
 * WRAPPER_COL.span }}`. The offset is applied only from `sm`, where the label
 * column actually sits beside the control; on stacked screens the offset is 0
 * so the button spans the full width instead of overflowing.
 */
export const ALIGNED_WRAPPER_COL: ColProps = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 12 },
}

export const INPUT_NUMBER_STYLE = { width: '100%' }
