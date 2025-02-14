type Stati="todo"|"pending"|"done";

type Task={
    id:number;
    titolo:string;
    descrizione:string;
    stato:Stati;
    stima:number;
}