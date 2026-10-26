// "19:00" -> "7:00 PM"
export function formatTime(time) {
  const [hours, minutes] = time.split(":").map(Number)
  const suffix = hours >= 12 ? "PM" : "AM"
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`
}

// 50 -> "$50"
export function formatPrice(price) {
  return `$${price}`
}
