"use client";
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    refresh: () => void;
    onClose: () => void;
    statoIniziale: string;
}

const Modal = ({ refresh, onClose, statoIniziale }: ModalProps) => {
    const [messaggio, setMessaggio] = useState<string>("");
    const [isError, setError] = useState<boolean>(false);

    const [titolo, setTitolo] = useState<string>("");
    const [descrizione, setDescrizione] = useState<string>("");
    const [stato, setStato] = useState<string>(statoIniziale);
    const [stima, setStima] = useState<string>("");

    const postRequest = () => {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titolo: titolo,
                descrizione: descrizione,
                stato: stato,
                stima: stima
            }),
        }).then(response => response.json()).then(data => {
            if (data.status == 200) {
                refresh();
                onClose();
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

    return createPortal(
        <div className="w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex min-h-screen w-full items-center justify-center bg-black/30 p-4">
                <div className="w-full max-w-sm">
                    <div className="relative rounded-2xl bg-gray-700 p-6 shadow">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-zinc-200 md:text-2xl">Aggiungi</h2>
                            <button className="absolute right-5 top-5 text-gray-400 hover:text-gray-300" onClick={onClose}>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <label className="block text-base font-normal text-zinc-200 md:text-lg mb-2">Titolo</label>
                        <input onChange={e => setTitolo(e.target.value)} value={titolo} name="titolo" required type="text" className="text-zinc-300 bg-gray-600 w-full rounded-lg py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-600" />
                        <label className="block text-base font-normal text-zinc-200 md:text-lg mb-2">Descrizione</label>
                        <textarea onChange={(e) => setDescrizione(e.target.value)} value={descrizione} name="descrizione" className="text-zinc-300 bg-gray-600 w-full rounded-lg py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-600"></textarea>
                        <label className="block text-base font-normal text-zinc-200 md:text-lg mb-2">Stato</label>
                        <select onChange={e => { setStato(e.target.value) }} name="stato" defaultValue={statoIniziale} className="text-zinc-300 bg-gray-600 w-full rounded-lg border border-gray-600 py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-600">
                            <option value="pending">In corso</option>
                            <option value="todo">Da fare</option>
                            <option value="done">Completato</option>
                        </select>
                        <label className="block text-base font-normal text-zinc-200 md:text-lg mb-2">Stima</label>
                        <input onChange={e => setStima(e.target.value)} value={stima} name="stima" type="number" className="text-zinc-300 bg-gray-600 w-full rounded-lg py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-600" />
                        <button className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-zinc-200 transition duration-300 hover:bg-gray-800" onClick={postRequest}>Aggiungi</button>

                        {isError && <p className="bg-red-500 text-sm p-4 my-4 mt-8 rounded-md text-white text-center">{messaggio}</p>}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;