"use client";
import Card from "@/components/card";
import Loading from "@/components/loading";
import Modal from "@/components/modal";
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [needRefresh, setRefresh] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statoAdd, setStatoAdd] = useState<Stati>("todo");

    useEffect(() => {
        if (needRefresh) {
            fetch('/api/tasks/')
                .then(response => response.json())
                .then(tasks => {
                    setTasks(tasks);
                    setIsLoading(false);
                });
            setRefresh(false);
        }
    }, [needRefresh]);

    if (isLoading) {
        return (
            <Loading></Loading>
        );
    }

    return (
        <div className="bg-violet-500 h-full w-full md:min-h-screen">
            <div className="pt-8 pb-4">
                <h1 className="text-4xl font-black text-center">Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:mx-20 gap-y-0 my-0">
                <Card refresh={() => setRefresh(true)} titolo="In Corso" data={tasks.filter((task) => task.stato === "pending")} onAdd={() => { setIsModalOpen(true); setStatoAdd("pending") }} />
                <Card refresh={() => setRefresh(true)} titolo="Da Fare" data={tasks.filter((task) => task.stato === "todo")} onAdd={() => { setIsModalOpen(true); setStatoAdd("todo") }} />
                <Card refresh={() => setRefresh(true)} titolo="Completato" data={tasks.filter((task) => task.stato === "done")} onAdd={() => { setIsModalOpen(true); setStatoAdd("done") }} />
            </div>

            {isModalOpen ? <Modal refresh={() => setRefresh(true)} onClose={() => setIsModalOpen(false)} statoIniziale={statoAdd}></Modal> : null}
            <div id="modal-root"></div>
        </div>
    );
}