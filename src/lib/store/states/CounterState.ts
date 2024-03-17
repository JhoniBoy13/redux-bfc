import {LoadingState} from "@/lib/store/states/LoadingState";

export interface CounterState extends LoadingState{
    value: number
}