"use client";
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    stato: string;
}

const Modal = ({ isOpen, onClose, stato }: ModalProps) => {
    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className="w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex min-h-screen w-full items-center justify-center bg-black/30 p-4">
                <div className="w-full max-w-sm">
                    <div className="relative rounded-2xl bg-gray-800 p-6 shadow">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-zinc-200 md:text-2xl">Aggiungi</h2>
                            <button className="absolute right-5 top-5 text-gray-400 hover:text-gray-300" onClick={onClose}>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <label className="block text-base font-normal text-zinc-200 md:text-lg mb-2">Titolo</label>
                        <input required type="text" className="text-zinc-300 bg-gray-700 w-full rounded-lg py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-700" />
                        <label className="block text-base font-normal text-zinc-200 md:text-lg mb-2">Descrizione</label>
                        <textarea className="text-zinc-300 bg-gray-700 w-full rounded-lg py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-700"></textarea>
                        <label className="block text-base font-normal text-zinc-200 md:text-lg mb-2">Stato</label>
                        <select defaultValue={stato} className="text-zinc-300 bg-gray-700 w-full rounded-lg border border-gray-700 py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-700">
                            <option value="pending">In corso</option>
                            <option value="todo">Da fare</option>
                            <option value="done">Completato</option>
                        </select>
                        <label className="block text-base font-normal text-zinc-200 md:text-lg mb-2">Stima</label>
                        <input type="number" className="text-zinc-300 bg-gray-700 w-full rounded-lg py-2.5 px-4 mt-1 mb-4 text-base focus:outline-none focus:ring focus:ring-gray-700" />
                        <button className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-zinc-200 transition duration-300 hover:bg-gray-800">Salva</button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;