import { executeQuery, STATO_VALUES } from "@/lib/db";
import { isPositiveInteger } from "@/lib/utils";


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    if (isPositiveInteger(id.toString())) {
        const query = "SELECT * FROM tasks WHERE id = $1";
        const result = await executeQuery(query, [id]);
        if (result != null) {
            if (result.length == 0) {
                return Response.json({
                    status: 404,
                    message: "Task non trovato",
                    errorCode: "NOT_FOUND"
                }, { status: 404 });
            }
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
    else {
        return Response.json({
            status: 400,
            message: "ID non valido",
            errorCode: "BAD_REQUEST"
        }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    if (isPositiveInteger(id.toString())) {
        const query_check = "SELECT * FROM tasks WHERE id = $1";
        const result_check = await executeQuery(query_check, [id]);
        if (result_check?.length == 0) {
            return Response.json({
                status: 404,
                message: "Task non trovato",
                errorCode: "NOT_FOUND"
            }, { status: 404 });
        }

        const query = "DELETE FROM tasks WHERE id=$1;";
        const result = await executeQuery(query, [id]);
        if (result != null) {
            return Response.json({
                status: 200,
                message: "Task eliminato con successo"
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
            message: "ID non valido",
            errorCode: "BAD_REQUEST"
        }, { status: 400 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    if (isPositiveInteger(id.toString())) {
        const formData = await request.formData()
        const titolo = formData.get('titolo')?.toString().trim();
        const descrizione = formData.get('descrizione')?.toString().trim();
        const stima = formData.get('stima')?.toString();
        const stato = formData.get('stato')?.toString();

        if (titolo !== undefined && titolo !== '' && descrizione !== undefined && stato !== undefined && stima !== undefined && STATO_VALUES.includes(stato) && isPositiveInteger(stima)) {
            const query_check = "SELECT * FROM tasks WHERE id = $1";
            const result_check = await executeQuery(query_check, [id]);
            if (result_check?.length == 0) {
                return Response.json({
                    status: 404,
                    message: "Task non trovato",
                    errorCode: "NOT_FOUND"
                }, { status: 404 });
            }
            const query = "UPDATE tasks SET titolo=$1, descrizione=$2, stato=$3, stima=$4 WHERE id=$5";
            const result = await executeQuery(query, [titolo, descrizione, stato, stima, id]);
            if (result != null) {
                return Response.json({
                    status: 200,
                    message: "Task modificato correttamente"
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
    else {
        return Response.json({
            status: 400,
            message: "ID non valido",
            errorCode: "BAD_REQUEST"
        }, { status: 400 });
    }
}
