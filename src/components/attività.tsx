"use client";

interface AttivitàProps {
    titolo: string;
    stato: string;
    stima: number;
}

export default function Attività({ titolo, stato, stima }: AttivitàProps) {
    return(
        <div
            className="flex flex-col justify-center items-center bg-white"
        >
            <div
                className="mx-auto flex w-full mb-4 flex-col justify-center pt-0 md:h-[unset] max-w-[520px] lg:px-0 xl:pl-0"
            >
                <div className="relative flex w-full flex-col pt-[20px] md:pt-0">
                    <div
                        className="rounded-lg border bg-card text-card-foreground shadow-sm mb-5 h-min max-w-full pt-8 pb-6 px-6 dark:border-zinc-800"
                    >
                        <p
                            className="text-lg font-bold text-zinc-950 dark:text-white md:text-large"
                        >
                            {titolo}
                        </p>
                        <p
                            className="text-sm font-normal text-zinc-950 dark:text-white md:text-base"
                        >
                            {stato}
                        </p>
                        <p
                            className="text-sm font-normal text-zinc-950 dark:text-white md:text-base"
                        >
                            {`Stima: ${stima}h`}
                        </p>
                        <button></button>
                    </div>
                </div>
            </div>

        </div>
    );
}