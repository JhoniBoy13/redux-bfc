import {Event} from "@/lib/entities/Event";
import {mockEvents} from "@/lib/features/mock/mockData";

export async function fetchCounter():  Promise<number>  {
    return new Promise<number>((resolve) => {
        setTimeout(() => {
            resolve(5);
        }, 1000);
    });
}