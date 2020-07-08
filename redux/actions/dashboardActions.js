export function setDashboardView(tab) {
  return { type: "SET_DASHBOARD_VIEW", payload: tab };
}
export function setDashboardUser(isCoinbase) {
  return { type: "SET_DASHBOARD_USER", payload: isCoinbase };
}

export function toggleMobileNav() {
  return { type: "TOGGLE_MOBILE_NAV" };
}
