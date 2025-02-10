"use client";

import Attività from "./attività";

interface CardProps {
    titolo: string;
}

export default function Card({ titolo }: CardProps) {
    return (
        <div
            className="flex flex-col justify-center items-center min-h-[50vh]"
        >
            <div
                className="mx-auto flex w-full pt-10 flex-col justify-center px-5 pt-0 md:h-[unset] max-w-[400px] lg:px-6 xl:pl-0"
            >
                <div className="relative flex w-full flex-col pt-[20px] md:pt-0 ">
                    <div
                        className="bg-white rounded-lg border bg-card text-card-foreground shadow-sm mb-5 h-min max-w-full pt-8 pb-6 px-6 dark:border-zinc-800"
                    >
                        <p
                            className="mb-8 text-xl font-extrabold text-zinc-950 dark:text-white md:text-3xl"
                        >
                            {titolo}
                        </p>
                        <Attività titolo="Sviluppo" stato="Pending" stima={2} ></Attività>
                        <Attività titolo="Test" stato="Eseguito" stima={4} ></Attività>
                        <button className="w-full mt-4 px-4 py-2 border border-gray-400 rounded-lg hover:bg-violet-600 hover:text-white transition duration-200 ease-in-out focus:outline-none">
                            Aggiungi
                        </button>
                        
                    </div>
                </div>
            </div>

        </div>
    );
}