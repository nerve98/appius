import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[url(/bg6.jpg)] bg-opacity-80 h-full w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <span className="md:text-6xl text-5xl font-bold text-gray-900">Gira</span>
        <hr className="bg-gray-900 h-px border-0 w-full text-gray-300" />
        <h6 className="md:text-4xl text-3xl font-bold text-gray-900">Naviga tra le Sfide del Project Management</h6>
        <p className="md:text-2xl text-xl w-full md:w-auto text-gray-900">Stanco di email che si perdono nel limbo e riunioni che durano un'eternità? Con la nostra app, il caos diventa un ricordo lontano. Gestisci progetti, assegna task, monitora progressi e... conquista il mondo! (O almeno, la tua lista di cose da fare).</p>
        <Link className="md:text-4xl text-3xl font-bold m-auto text-gray-800" href='/dashboard'>Prova ora</Link>
      </main>
    </div>
  );
}
