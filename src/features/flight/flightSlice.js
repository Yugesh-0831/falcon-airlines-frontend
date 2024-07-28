import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllFlights, updateFlightSchedule } from "./flightApi";

const initialState = {
  flights: [],
  status: "idle",
};

export const fetchAllFlightsAsync = createAsyncThunk(
  "flight/fetchAllFlights",
  async () => {
    const response = await fetchAllFlights();
    return response.data;
  }
);

export const updateFlightScheduleAsync = createAsyncThunk(
  "flight/updateFlightSchedule",
  async (update) => {
    const response = await updateFlightSchedule(update);
    return response.data;
  }
);

// actions
export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFlightsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllFlightsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.flights = action.payload;
      });
  },
});

// selectors
export const selectAllFlights = (state) => state.flight.flights;

export default flightSlice.reducer;
