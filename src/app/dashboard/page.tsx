"use client";
import Card from "@/components/card";
import Modal from "@/components/modal";
import { useEffect, useState } from 'react';

export default function Dashboard() {
    /*const response=await fetch('http://localhost:3000/api/tasks/');
    const tasks=await response.json();
    console.log(tasks);

    let pendingTasks: Task[]=[];
    let todoTasks: Task[]=[];
    let doneTasks: Task[]=[];
    tasks.forEach((task: Task) => {
        switch(task.stato){
            case "pending":
                pendingTasks.push(task);
                break;
            case "todo":
                todoTasks.push(task);
                break;
            case "done":
                doneTasks.push(task);
                break;
        }
    });*/
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statoAdd, setStatoAdd] = useState<Stati>("todo");

    useEffect(() => {
        fetch('/api/tasks/')
            .then(response => response.json())
            .then(tasks => {
                setTasks(tasks);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className='flex space-x-2 justify-center items-center bg-violet-500 h-screen'>
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
            </div>
        );
    }

    return (
        <div className="bg-violet-500 h-full w-full md:min-h-screen">
            <div className="pt-8 pb-4">
                <h1 className="text-4xl font-black text-center">Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:mx-20 gap-y-0 my-0">
                <Card titolo="In Corso" data={tasks.filter((task) => task.stato === "pending")} onAdd={() => {setIsModalOpen(true); setStatoAdd("pending")}} />
                <Card titolo="Da Fare" data={tasks.filter((task) => task.stato === "todo")} onAdd={() => {setIsModalOpen(true); setStatoAdd("todo")}} />
                <Card titolo="Completato" data={tasks.filter((task) => task.stato === "done")} onAdd={() => {setIsModalOpen(true); setStatoAdd("done")}} />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} stato={statoAdd}></Modal>
            <div id="modal-root"></div>
        </div>
    );
}