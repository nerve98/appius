export default async function TaskPage({params}:any) {
    const {id} = await params;
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        cache: "no-store",
    });
    const tasks = await response.json();
    const task = tasks[0];

    return (
        <div className="bg-gradient-to-r bg-violet-600 to-indigo-600 h-full w-full md:min-h-screen">
            <div className="justify-center align-middle mx-auto w-full max-w-2xl">
                <span>
                    <label>Titolo</label>
                    <input type="text" value={task.titolo} className="w-full rounded-lg border border-gray-300 py-2.5 px-4 mt-1 mb-4 text-sm focus:outline-none focus:ring focus:ring-gray-300" />
                </span>
                <span>
                    <label>Descrizione</label>
                    <textarea value={task.descrizione} className="w-full rounded-lg border border-gray-300 py-2.5 px-4 mt-1 mb-4 text-sm focus:outline-none focus:ring focus:ring-gray-300"></textarea>
                </span>
                <span>
                    <label>Stato</label>
                    <select defaultValue={task.stato} className="w-full rounded-lg border border-gray-300 py-2.5 px-4 mt-1 mb-4 text-sm focus:outline-none focus:ring focus:ring-gray-300">
                        <option value="pending">In corso</option>
                        <option value="todo">Da fare</option>
                        <option value="done">Completato</option>
                    </select>
                </span>
                <span>
                    <label>Stima</label>
                    <input type="number" value={task.stima} className="w-full rounded-lg border border-gray-300 py-2.5 px-4 mt-1 mb-4 text-sm focus:outline-none focus:ring focus:ring-gray-300" />
                </span>
                <button className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-gray-800">Salva</button>
            </div>
        </div>
    )
}