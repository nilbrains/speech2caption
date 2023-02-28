import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => ({ fontsize: "28px", color: "#fff", background: "transparent" }),
  getters: {},
  actions: {
    reload() {
        const _ = JSON.parse(localStorage.getItem("setting") || '{"fontsize":"28px","color":"#fff","background":"transparent"}')
        this.fontsize = _?.fontsize;
        this.color = _?.color;
        this.background = _?.background;
    }
  },
  persist: true,
});
