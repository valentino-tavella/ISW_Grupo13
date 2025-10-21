import type { ComprarEntradaRequest, ComprarEntradaResponse } from "@/types/entrada";
import apiClient from "./api";

export async function comprarEntrada(body: ComprarEntradaRequest): Promise<ComprarEntradaResponse> {
    const { data } = await apiClient.post("/entradas/comprar", body);
    return data;
}