"use client";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import Loading from "@/components/loading";
import { useRouter } from 'next/navigation'

export default function TaskPage() {
    const params = useParams<{ id: string }>()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true);
    const [messaggio, setMessaggio] = useState<string>("");
    const [isError, setError] = useState<boolean>(false);

    const [titolo, setTitolo] = useState<string>();
    const [descrizione, setDescrizione] = useState<string>();
    const [stato, setStato] = useState<string>();
    const [stima, setStima] = useState<string>();

    useEffect(() => {
        fetch(`/api/tasks/${params.id}`)
            .then(response => response.json())
            .then(tasks => {
                setTitolo(tasks[0].titolo);
                setDescrizione(tasks[0].descrizione);
                setStato(tasks[0].stato);
                setStima(tasks[0].stima.toString());
                setIsLoading(false);
            });
    }, []);



    const deleteTask = async () => {
        fetch(`/api/tasks/${params.id}`, {
            method: 'DELETE',
        }).then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    router.push('/dashboard')
                }
                else {
                    setMessaggio(data.message);
                    setError(true);
                }
            }).catch((error) => {
                setMessaggio("Errore connessione server");
                setError(true);
            });
    }

    const updateTask = async () => {
        fetch(`/api/tasks/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titolo: titolo,
                descrizione: descrizione,
                stato: stato,
                stima: stima
            })
        }).then(response => response.json()).then(data => {
            if (data.status == 200) {
                router.push('/dashboard')
            }
            else {
                setMessaggio(data.message);
                setError(true);
            }
        }).catch((error) => {
            setMessaggio("Errore connessione server");
            setError(true);
        });
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="w-full fixed inset-0 bg-violet-500 flex justify-center items-center">
            <div className="flex min-h-screen w-full items-center justify-center p-4">
                <div className="w-full max-w-sm md:max-w-xl">
                    <div className="relative rounded-2xl bg-gray-700 p-6 shadow">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-zinc-200 md:text-2xl">Modifica</h2>
                        </div>
                        <span>
                            <label className="text-base font-normal text-zinc-200 md:text-lg mb-2">Titolo</label>
                            <input onChange={e => setTitolo(e.target.value)} value={titolo} name="titolo" required type="text" className="text-zinc-300 bg-gray-600 w-full rounded-lg py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-600" />
                        </span>
                        <label className="block text-base font-normal text-zinc-200 md:text-lg mb-2">Descrizione</label>
                        <textarea onChange={(e) => setDescrizione(e.target.value)} value={descrizione} name="descrizione" className="text-zinc-300 bg-gray-600 w-full rounded-lg py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-600"></textarea>
                        <label className="block text-base font-normal text-zinc-200 md:text-lg mb-2">Stato</label>
                        <select onChange={e => { setStato(e.target.value) }} name="stato" defaultValue={stato} className="text-zinc-300 bg-gray-600 w-full rounded-lg border border-gray-600 py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-600">
                            <option value="pending">In corso</option>
                            <option value="todo">Da fare</option>
                            <option value="done">Completato</option>
                        </select>
                        <label className="block text-base font-normal text-zinc-200 md:text-lg mb-2">Stima</label>
                        <input onChange={e => setStima(e.target.value)} value={stima} name="stima" type="number" className="text-zinc-300 bg-gray-600 w-full rounded-lg py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-600" />
                        <span>
                            <button onClick={updateTask} className="align-top w-96 rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-zinc-200 transition duration-300 hover:bg-gray-950">Modifica</button>
                            <button onClick={deleteTask} className="items-end align-top w-32 h-10 ml-4 rounded-lg bg-red-500 text-white px-2 hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none">
                                <span className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    Cancella
                                </span>
                            </button>
                        </span>
                        {isError && <p className="bg-red-500 text-sm p-4 my-4 mt-8 rounded-md text-white text-center">{messaggio}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}