
import { createSlice } from '@reduxjs/toolkit';

interface NavigationState {
  isMobileMenuOpen: boolean;
  activeSection: string;
}

const initialState: NavigationState = {
  isMobileMenuOpen: false,
  activeSection: 'home',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu, setActiveSection } = navigationSlice.actions;
export default navigationSlice.reducer;
