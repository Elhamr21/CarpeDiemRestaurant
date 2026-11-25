export const CLOSED_RESERVATION_DATES: readonly string[] = ["2026-12-24"]

export const CLOSURE_MESSAGE =
  "Am 24.12.2026 bleibt unser Restaurant geschlossen. Für diesen Tag sind keine Reservierungen möglich."

export const isClosedReservationDate = (date: string) =>
  CLOSED_RESERVATION_DATES.includes(date)
