interface visitante {
    edad_visitante: number;
    tipoPase: "VIP" | "regular";
    precio?: number;
}

export interface ComprarEntradaRequest {
    fecha: string;
    formaPago: string;
    email: string;
    entradas: visitante[];
}

export interface ComprarEntradaResponse {
    exito: boolean;
    mensaje: string;
    fecha: string;
    cantidad: number;
    entradas: visitante[];
    formaPago: string;
    email: string;
    total: number;
}

export interface ErrorResponse {
    exito: boolean;
    mensaje: string;
}