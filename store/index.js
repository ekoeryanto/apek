export const state = () => ({
  dark: false
})

export const mutations = {
  toggleDarkMode (state) {
    state.dark = !state.dark
  }
}