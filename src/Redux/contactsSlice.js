import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  items: JSON.parse(localStorage.getItem('contacts')) || [],
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      const isInclude = state.items.find(
        contact => contact.name.toLowerCase() === payload.name.toLowerCase()
      );

      if (isInclude) {
        alert(`${payload.name} is already in contacts.`);
        return;
      }

      state.items.push(payload);
      localStorage.setItem('contacts', JSON.stringify(state.items));
    },
    removeContact: (state, action) => {
      state.items = state.items.filter(({ id }) => id !== action.payload);
      localStorage.setItem('contacts', JSON.stringify(state.items));
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { removeContact, updateFilter } = contactsSlice.actions;
export const addContact = createAction(
  contactsSlice.actions.addContact.toString(),
  ({ name, number }) => {
    return {
      payload: {
        id: nanoid(),
        name,
        number,
      },
    };
  }
);

export default contactsSlice.reducer;
