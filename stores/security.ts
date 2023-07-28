import { defineStore } from "pinia";

export const useSecurityStore = defineStore({
    id: "security",
    state: () => ({
        currentSession: null
    }),
    actions: {
        startNewSession () {
            clearTimeout(this.currentSession);
            this.currentSession = setTimeout(() => this.currentSession = null, 5 * 60 * 1000);
        }
    }
})