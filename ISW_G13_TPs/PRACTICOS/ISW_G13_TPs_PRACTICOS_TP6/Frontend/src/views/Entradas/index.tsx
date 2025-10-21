import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ConfigProvider, DatePicker, InputNumber, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";

// --- ESQUEMAS Y LÓGICA (SIN CAMBIOS) ---
const visitanteSchema = z.object({
    edad: z
        .number()
        .min(0, "Debe ser mayor o igual a 0")
        .max(120, "Edad no válida"),
    tipo: z.enum(["Regular", "VIP"], "Seleccione un tipo de pase"),
});

const schema = z.object({
    fecha: z.date({ required_error: "Seleccione una fecha" }),
    formaPago: z.enum(["Efectivo", "Tarjeta"], "Seleccione una forma de pago"),
    visitantes: z
        .array(visitanteSchema)
        .min(1, "Debe haber al menos un visitante"),
});

type FormData = z.infer<typeof schema>;

function Entradas() {
    const methods = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            fecha: undefined,
            formaPago: "Tarjeta",
            visitantes: [{ edad: 0, tipo: "Regular" }],
        },
    });

    const { fields, append, replace } = useFieldArray({
        control: methods.control,
        name: "visitantes",
    });
    
    const visitantes = methods.watch("visitantes");
    const cantidad = visitantes.length;

    const handleCantidadChange = (value: number) => {
        if (value > fields.length) {
            const nuevos = Array(value - fields.length)
                .fill(null)
                .map(() => ({ edad: 0, tipo: "Regular" as const }));
            append(nuevos);
        } else {
            replace(fields.slice(0, value));
        }
    };

    const onSubmit = (data: FormData) => {
        console.log("Datos enviados", data);
        alert("¡Compra confirmada! Revisa la consola para ver los datos.");
    };

    const disabledDate = (current: Dayjs) => {
        const now = dayjs();
        const today = now.startOf("day");
        const isAfterClosing = now.hour() >= 19;

        if (current < today || (isAfterClosing && current.isSame(today, "day"))) {
            return true;
        }
        if (current.day() === 1) return true;
        const isChristmas = current.date() === 25 && current.month() === 11;
        const isNewYear = current.date() === 1 && current.month() === 0;
        return isChristmas || isNewYear;
    };

    const precios = { Regular: 5000, VIP: 10000 };
    const totalCompra = visitantes.reduce((acc, visitante) => {
        const precio = precios[visitante.tipo] || 0;
        return acc + precio;
    }, 0);

    // --- RENDERIZADO CON DISEÑO RESPONSIVE MEJORADO ---
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#134611',
                    borderRadius: 8,
                    fontFamily: 'inherit',
                    colorLink: '#3E8914',
                    colorLinkHover: '#3DA35D',
                },
            }}
        >
            <div className="min-h-screen bg-[#E8FCCF] flex items-center justify-center p-4 font-sans">
                <div className="bg-white rounded-xl shadow-2xl flex flex-col gap-6 p-4 md:p-8 w-full max-w-4xl m-auto">
                    <div>
                        <h1 className="text-2xl md:text-3xl w-full text-center font-bold text-[#134611]">
                            Compra de Entradas
                        </h1>
                        <p className="text-center text-gray-500 mt-1">Completa los datos para tu próxima aventura</p>
                    </div>
                    <form
                        className="flex flex-col gap-6 w-full"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            <div className="flex flex-col">
                                <label className="mb-1.5 font-medium text-gray-600">Fecha de visita:</label>
                                <Controller
                                    control={methods.control}
                                    name="fecha"
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <DatePicker
                                                style={{ width: '100%' }}
                                                format="DD/MM/YYYY"
                                                size="large"
                                                placeholder="Seleccionar fecha"
                                                disabledDate={disabledDate}
                                                onChange={(value) => field.onChange(value?.toDate() ?? undefined)}
                                                value={field.value ? dayjs(field.value) : null}
                                                status={error ? 'error' : undefined}
                                            />
                                            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-medium text-gray-600">Cantidad:</label>
                                <Select
                                    size="large"
                                    value={cantidad}
                                    onChange={handleCantidadChange}
                                    options={Array.from({ length: 10 }, (_, i) => ({
                                        value: i + 1,
                                        label: `${i + 1} entrada${i > 0 ? 's' : ''}`,
                                    }))}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="mb-1.5 font-medium text-gray-600">Forma de pago:</label>
                                <Controller
                                    control={methods.control}
                                    name="formaPago"
                                    render={({ field }) => (
                                        <Select
                                            size="large"
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={[{ value: "Tarjeta", label: "Tarjeta" }, { value: "Efectivo", label: "Efectivo" }]}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* --- LISTA/TABLA DE VISITANTES RESPONSIVE --- */}
                        <div className="w-full">
                            {/* Encabezado visible solo en pantallas grandes (md en adelante) */}
                            <div className="hidden md:grid md:grid-cols-3 gap-x-6 px-6 py-3 text-xs text-white uppercase bg-[#134611] rounded-t-lg">
                                <div className="font-semibold">Visitante</div>
                                <div className="font-semibold">Edad</div>
                                <div className="font-semibold">Tipo de Pase</div>
                            </div>
                            {/* Contenedor de las tarjetas/filas */}
                            <div className="space-y-4 md:space-y-0">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-x-6 p-4 md:px-6 md:py-4 bg-white border md:border-t-0 border-gray-200 last:rounded-b-lg first:md:rounded-t-none hover:bg-gray-50">
                                        <div className="flex items-center font-bold text-gray-800">
                                            <span className="md:hidden mr-2 text-gray-500 font-medium">Visitante:</span>
                                            Visitante {index + 1}
                                        </div>
                                        <div className="flex items-center mt-2 md:mt-0">
                                            <label className="md:hidden mr-2 text-gray-500 font-medium">Edad:</label>
                                            <Controller
                                                control={methods.control}
                                                name={`visitantes.${index}.edad`}
                                                render={({ field, fieldState: { error } }) => (
                                                    <div className="w-full md:w-auto">
                                                        <InputNumber
                                                            min={0} max={120}
                                                            value={field.value}
                                                            onChange={(val) => field.onChange(val ?? 0)}
                                                            className="w-full md:w-24"
                                                            status={error ? 'error' : undefined}
                                                        />
                                                        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        <div className="flex items-center mt-2 md:mt-0">
                                            <label className="md:hidden mr-2 text-gray-500 font-medium">Pase:</label>
                                            <Controller
                                                control={methods.control}
                                                name={`visitantes.${index}.tipo`}
                                                render={({ field }) => (
                                                    <Select
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        className="w-full md:w-40"
                                                        options={[
                                                            { value: "Regular", label: "Regular ($5000)" },
                                                            { value: "VIP", label: "VIP ($10000)" },
                                                        ]}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-right mt-2">
                            <p className="text-lg font-medium text-gray-600">Total a Pagar:</p>
                            <p className="text-2xl md:text-3xl font-bold text-[#134611]">
                                {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(totalCompra)}
                            </p>
                        </div>
                        
                        <Button type="primary" htmlType="submit" size="large" block>
                            Confirmar Compra
                        </Button>
                    </form>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default Entradas;