//authStore.ts
//Global state för autentisering. Håller koll på inloggningstatus i hela appen.
import { create } from 'zustand';
import type { AuthStore } from '../types/types';


export const useAuthStore = create<AuthStore>((set) =>({
    //Startvärden som läses från localStorage så användaren förblir inloggad vid omladdning
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),

    //Login som sparar user och token samt sätter isAuthenticated till true
    login: (user, token) => {
        localStorage.setItem('token', token); //persistera i localStorage
        set({ user, token, isAuthenticated: true});
    },

    //Logout som rensar allt
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false});
    },
}));







