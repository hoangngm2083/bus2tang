import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookingData: null, // Lưu trữ dữ liệu data từ handleClickBooking
  },
  reducers: {
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
  },
});

export const { setBookingData } = bookingSlice.actions;
export const getBookingInfo = (state) => state.bookingData; // selector lấy userId
export default bookingSlice.reducer;
