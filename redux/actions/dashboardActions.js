export function setDashboardNav(tab) {
  return { type: "SET_DASHBOARD_NAV", payload: tab };
}

export function toggleMobileNav() {
  return { type: "TOGGLE_MOBILE_NAV" };
}
