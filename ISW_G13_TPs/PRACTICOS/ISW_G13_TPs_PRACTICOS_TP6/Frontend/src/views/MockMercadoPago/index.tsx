import { useLocation, useNavigate, Navigate } from "react-router";
import { useState } from "react";
import { useEntradaMutations } from "@/hooks/useEntradaMutations";
import { CreditCard, Lock, ArrowLeft } from "@phosphor-icons/react";
import Swal from "sweetalert2";

interface LocationState {
    total: number;
    fecha: Date;
    visitantes: Array<{ edad: number; tipo: "Regular" | "VIP" }>;
    email: string;
    formaPago: string;
}

function MockMercadoPago() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;
    const { comprarEntradaMutation } = useEntradaMutations();
    const [procesando, setProcesando] = useState(false);

    // Si no hay datos en el state, redirigir
    if (!state) {
        return <Navigate to="/entradas" />;
    }

    const { total, fecha, visitantes, email, formaPago } = state;

    const handleConfirmarPago = async () => {
        setProcesando(true);

        // Simular delay de procesamiento de pago
        await new Promise(resolve => setTimeout(resolve, 2000));

        comprarEntradaMutation.mutate(
            {
                fecha: new Date(fecha).toISOString(),
                formaPago: formaPago.toLowerCase(),
                email: email,
                entradas: visitantes.map((value) => ({
                    edad_visitante: value.edad,
                    tipoPase: value.tipo,
                })),
            },
            {
                onSuccess: async () => {
                    setProcesando(false);
                    await Swal.fire({
                        title: "¡Pago procesado con éxito!",
                        html: `
                            Tu compra ha sido confirmada.<br>
                            Te llegará un mail de confirmación a <strong>${email}</strong>.<br><br>
                            <strong>Detalles de la compra:</strong><br>
                            Cantidad de entradas: ${visitantes.length}<br>
                            Fecha de visita: ${new Date(fecha).toLocaleDateString("es-AR", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}<br>
                            Total pagado: ${new Intl.NumberFormat('es-AR', { 
                                style: 'currency', 
                                currency: 'ARS' 
                            }).format(total)}
                        `,
                        icon: "success",
                        confirmButtonText: "Volver al inicio",
                        confirmButtonColor: "#009EE3",
                        customClass: {
                            confirmButton: "!px-6 !py-3 !text-base",
                        },
                    });
                    navigate("/");
                },
                onError: async (data) => {
                    setProcesando(false);
                    await Swal.fire({
                        title: "Error en el pago",
                        text: `No se pudo procesar el pago. ${data.response?.data.mensaje || 'Intenta nuevamente.'}`,
                        icon: "error",
                        confirmButtonText: "Volver a intentar",
                        confirmButtonColor: "#009EE3",
                    });
                },
            }
        );
    };

    const handleVolver = () => {
        navigate("/entradas");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header estilo Mercado Pago */}
                <div className="bg-white rounded-t-lg shadow-lg p-6 border-b-4 border-[#009EE3]">
                    <button
                        onClick={handleVolver}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} weight="bold" />
                        <span>Volver</span>
                    </button>
                    
                    Logo de Mercado Pago
                    <div className="flex justify-center mb-6">
                        <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M48.5 12.5h3.2v11.8c0 2.8-1.9 4.7-4.8 4.7-1.4 0-2.6-.4-3.5-1.1l1.2-2.4c.6.5 1.3.7 2 .7 1.2 0 1.9-.7 1.9-2V12.5zm-1.6-4.8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM59.3 29c-3.9 0-6.8-2.8-6.8-6.7s2.9-6.7 6.8-6.7 6.8 2.8 6.8 6.7-2.9 6.7-6.8 6.7zm0-10.5c-2.1 0-3.5 1.6-3.5 3.8s1.4 3.8 3.5 3.8 3.5-1.6 3.5-3.8-1.4-3.8-3.5-3.8zM73.8 29c-3.9 0-6.8-2.8-6.8-6.7s2.9-6.7 6.8-6.7 6.8 2.8 6.8 6.7-2.9 6.7-6.8 6.7zm0-10.5c-2.1 0-3.5 1.6-3.5 3.8s1.4 3.8 3.5 3.8 3.5-1.6 3.5-3.8-1.4-3.8-3.5-3.8zM88.3 29c-3.9 0-6.8-2.8-6.8-6.7s2.9-6.7 6.8-6.7 6.8 2.8 6.8 6.7-2.9 6.7-6.8 6.7zm0-10.5c-2.1 0-3.5 1.6-3.5 3.8s1.4 3.8 3.5 3.8 3.5-1.6 3.5-3.8-1.4-3.8-3.5-3.8zM102.8 29c-3.9 0-6.8-2.8-6.8-6.7s2.9-6.7 6.8-6.7 6.8 2.8 6.8 6.7-2.9 6.7-6.8 6.7zm0-10.5c-2.1 0-3.5 1.6-3.5 3.8s1.4 3.8 3.5 3.8 3.5-1.6 3.5-3.8-1.4-3.8-3.5-3.8z" fill="#009EE3"/>
                            <path d="M20 0C8.95 0 0 8.95 0 20s8.95 20 20 20 20-8.95 20-20S31.05 0 20 0zm0 36c-8.84 0-16-7.16-16-16S11.16 4 20 4s16 7.16 16 16-7.16 16-16 16z" fill="#009EE3"/>
                            <path d="M20 8c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12S26.63 8 20 8zm4.5 9.5l-5.5 5.5-2.5-2.5-2 2 4.5 4.5 7.5-7.5-2-2z" fill="#00B0FF"/>
                        </svg>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="bg-[#009EE3] p-3 rounded-full">
                            <CreditCard size={32} weight="fill" className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Checkout
                        </h1>
                    </div>
                    <p className="text-center text-gray-600">Completa tu compra de forma segura</p>
                </div>

                {/* Detalles de la compra */}
                <div className="bg-white shadow-lg p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Lock size={20} weight="fill" className="text-green-600" />
                            Resumen de tu compra
                        </h2>
                        
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center pb-3 border-b">
                                <span className="text-gray-600 font-medium">Fecha de visita:</span>
                                <span className="font-semibold text-gray-800">
                                    {new Date(fecha).toLocaleDateString("es-AR", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-3 border-b">
                                <span className="text-gray-600 font-medium">Cantidad de entradas:</span>
                                <span className="font-semibold text-gray-800">{visitantes.length}</span>
                            </div>

                            <div className="pt-2">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Detalle de visitantes:</h3>
                                <div className="space-y-2">
                                    {visitantes.map((visitante, index) => (
                                        <div key={index} className="flex justify-between items-center bg-white rounded p-2 text-sm">
                                            <span className="text-gray-600">
                                                Visitante {index + 1} ({visitante.edad} años)
                                            </span>
                                            <span className="font-semibold text-gray-800">
                                                {visitante.tipo} - {new Intl.NumberFormat('es-AR', { 
                                                    style: 'currency', 
                                                    currency: 'ARS' 
                                                }).format(visitante.tipo === "VIP" ? 10000 : 5000)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="bg-gradient-to-r from-[#009EE3] to-[#0077B5] rounded-lg p-6 text-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm opacity-90 mb-1">Total a pagar</p>
                                <p className="text-4xl font-bold">
                                    {new Intl.NumberFormat('es-AR', { 
                                        style: 'currency', 
                                        currency: 'ARS' 
                                    }).format(total)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm opacity-90">Forma de pago</p>
                                <p className="text-lg font-semibold">💳 Tarjeta</p>
                            </div>
                        </div>
                    </div>

                    {/* Información de seguridad */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Lock size={20} className="text-green-600 mt-0.5" weight="fill" />
                            <div className="text-sm text-green-800">
                                <p className="font-semibold mb-1">Pago seguro</p>
                                <p className="text-green-700">
                                    Tus datos están protegidos. Esta es una simulación de pago.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            onClick={handleConfirmarPago}
                            disabled={procesando}
                            className="w-full bg-[#009EE3] hover:bg-[#0077B5] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
                        >
                            {procesando ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Procesando pago...
                                </span>
                            ) : (
                                "Confirmar y pagar"
                            )}
                        </button>
                        
                        <button
                            onClick={handleVolver}
                            disabled={procesando}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-white rounded-b-lg shadow-lg p-4 text-center text-sm text-gray-500">
                    <p>🔒 Esta es una simulación de pago con fines educativos</p>
                </div>
            </div>
        </div>
    );
}

export default MockMercadoPago;