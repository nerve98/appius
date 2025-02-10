"use client";
import Card from "@/components/card";
import Modal from "@/components/modal";
import { useState } from 'react';

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <h1 className="text-4xl font-black text-center mt-4 mb-8">Dashboard</h1>
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 max-h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 md:mx-20 gap-y-0 my-0">
                    <Card titolo="In Corso" onAdd={() => setIsModalOpen(true)}/>
                    <Card titolo="Da Fare" onAdd={() => setIsModalOpen(true)}/>
                    <Card titolo="Fatto" onAdd={() => setIsModalOpen(true)}/>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}></Modal>
            <div id="modal-root"></div>
        </div>
    );
}