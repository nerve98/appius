"use client";

import Attività from "./attività";

interface CardProps {
    titolo: string;
    data: Task[];
    onAdd: () => void;
    refresh: () => void;
}

export default function Card({ refresh, titolo, data, onAdd }: CardProps) {

    return (
        <div
            className="flex flex-col items-center min-h-max"
        >
            <div
                className="mx-auto flex w-full pt-10 flex-col justify-center px-5 pt-0 max-w-[400px] lg:px-6 xl:pl-0"
            >
                <div className="relative flex w-full flex-col pt-[20px] md:pt-0 ">
                    <div
                        className="bg-violet-700 rounded-lg bg-card text-card-foreground shadow-sm mb-5 max-w-full pt-8 pb-6 px-6"
                    >
                        <p
                            className="mb-8 text-2xl font-extrabold text-black md:text-3xl"
                        >
                            {titolo}
                        </p>
                        {
                            data.map((task: Task) => (
                                <Attività key={task.id} titolo={task.titolo} stato={task.stato} stima={task.stima} id={task.id} refresh={refresh} />
                            ))
                        }
                        <button onClick={onAdd} className="w-full mt-4 px-4 py-2 text-gray-100 bg-gray-900 rounded-lg hover:bg-gray-800 hover:text-gray-100 transition duration-200 ease-in-out focus:outline-none">
                            Aggiungi
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
}