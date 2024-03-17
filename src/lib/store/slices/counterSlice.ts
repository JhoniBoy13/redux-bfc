import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchCounter} from "@/lib/features/api/CounterAPI";
import {CounterState} from "@/lib/store/states/CounterState";

const initialState : CounterState = {
        value: 0,
        loading: 'idle'
};

export const fetchCounterAsync = createAsyncThunk(
    'counter/fetchCounter',
    async () => {
        try {
            return await fetchCounter();
        }
        catch (error) {
            throw error;
        }
    }
);

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.value++
        },
        reset(state) {
            state.value = 0
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCounterAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchCounterAsync.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.value = action.payload;
            })
            .addCase(fetchCounterAsync.rejected, (state) => {
                state.loading = 'failed';
            });
    },
})

export const { increment, reset } = counterSlice.actions
export default counterSlice.reducer