import { comprarEntrada } from "@/services/entradaApi";
import type { ComprarEntradaRequest, ComprarEntradaResponse, ErrorResponse } from "@/types/entrada";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useEntradaMutations() {
    const queryClient = useQueryClient();

    const comprarEntradaMutation = useMutation<
        ComprarEntradaResponse,
        AxiosError<ErrorResponse>,
        ComprarEntradaRequest
    >({
        mutationFn: comprarEntrada,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["entradas"] });
        },
    });

    return {
        comprarEntradaMutation,
    };
}
