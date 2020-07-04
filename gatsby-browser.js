import "./src/styles/global.scss"

if (typeof window !== undefined) {
  if (window.location.pathname !== "/comingsoon") {
    window.location.replace("/comingsoon")
  }
}
