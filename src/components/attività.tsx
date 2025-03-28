"use client";
import Link from 'next/link'


interface AttivitàProps {
    titolo: string;
    stato: string;
    stima: number;
    id: number;
    refresh: () => void;
}

export default function Attività({ refresh, titolo, stato, stima, id }: AttivitàProps) {

    const deleteTask = async () => {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                refresh();
            }
        });
    }

    return (
        <div className="flex flex-col justify-center items-center group"        >
            <div className="mx-auto flex w-full mb-4 flex-col justify-center pt-0 md:h-[unset] max-w-[520px] lg:px-0 xl:pl-0"            >
                <div className="relative flex w-full flex-col pt-[20px] md:pt-0">
                    <div className="hover:bg-fuchsia-600 hover:text-black transition duration-200 ease-in-out  bg-violet-600 rounded-lg bg-card text-card-foreground shadow-sm mb-5 h-min max-w-full pt-8 pb-6 px-6 dark:border-zinc-800"                    >
                        <p className="text-lg font-bold text-zinc-800 md:text-large"                        >
                            {titolo}
                        </p>
                        <p className="text-sm font-normal text-zinc-800 dark:text-white md:text-base"                        >
                            {`Stima: ${stima} ore`}
                        </p>
                        <div className="flex justify-end">
                            <Link href={`/task/${id}`} className="hidden group-hover:block mr-1 rounded-lg bg-orange-500 text-white px-2 py-2 mt-2 hover:bg-orange-600 transition duration-200 ease-in-out focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </Link>
                            <button onClick={deleteTask} className="hidden group-hover:block mx-1 rounded-lg bg-red-500 text-white px-2 py-2 mt-2 hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}