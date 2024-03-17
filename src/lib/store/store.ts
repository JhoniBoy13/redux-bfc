import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/lib/store/slices/counterSlice'
import eventsReducer from '@/lib/store/slices/eventSlice'
import modalReducer from '@/lib/store/slices/modalSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        events: eventsReducer,
        modals: modalReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch