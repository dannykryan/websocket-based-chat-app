export async function logoutUser(
  setUser: (u: any) => void,
  setToken: (t: string) => void,
  router: any,
) {
  const token = localStorage.getItem("token");
  if (token) {
    await fetch("http://localhost:4000/api/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  localStorage.removeItem("token");
  setUser(null);
  setToken("");
  router.replace("/login");
}
