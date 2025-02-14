import { executeQuery, STATO_VALUES } from "@/lib/db";
import { isPositiveInteger } from "@/lib/utils";


export async function GET() {
    const query = "SELECT * FROM tasks";
    const result = await executeQuery(query, []);
    if (result != null) {
        return Response.json(result, { status: 200 });
    }
    else {
        return Response.json({
            status: 500,
            message: "Errore connessione database",
            errorCode: "INTERNAL_SERVER_ERROR"
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const res = await request.json();
    const titolo = res.titolo;
    const descrizione = res.descrizione === undefined ? '' : res.descrizione;
    const stima = res.stima;
    const stato = res.stato;

    if (titolo !== undefined && titolo !== '' && descrizione !== undefined && stato !== undefined && stima !== undefined && STATO_VALUES.includes(stato) && isPositiveInteger(stima)) {
        const query = "INSERT INTO tasks(titolo, descrizione, stato, stima) VALUES($1, $2, $3, $4)";
        const result = await executeQuery(query, [titolo, descrizione, stato, stima]);
        if (result != null) {
            return Response.json({
                status: 200,
                message: "Task inserito correttamente"
            }, { status: 200 });
        }
        else {
            return Response.json({
                status: 500,
                message: "Errore connessione database",
                errorCode: "INTERNAL_SERVER_ERROR"
            }, { status: 500 });
        }
    }
    else {
        return Response.json({
            status: 400,
            message: "Dati incompleti o errati",
            errorCode: "BAD_REQUEST"
        }, { status: 400 });
    }
}