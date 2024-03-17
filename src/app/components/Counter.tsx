"use client"
import React from 'react'
import {reset, increment} from '../../lib/store/slices/counterSlice'
import {RootState} from "@/lib/store/store";
import {useDispatch, useSelector} from "react-redux";


export function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(reset())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}