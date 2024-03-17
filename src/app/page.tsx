"use client"
import {Counter} from "@/app/components/Counter";
import {Calendar} from "@/app/components/Calendar";
import {Provider} from "react-redux";
import {store} from "@/lib/store/store";
import {useState} from "react";
import {Modal} from "@/lib/entities/Modal";
import {InfoDialog} from "@/app/components/dialogs/InfoDialog";
import {DateSpan} from "@/lib/entities/DateSpan";

export default function Home() {

    const [isNewEvent, setIsNewEvent] = useState<boolean>(true)


    return (
      <Provider store={store}>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <Calendar />
              <InfoDialog />
          </main>
      </Provider>
  );
}
