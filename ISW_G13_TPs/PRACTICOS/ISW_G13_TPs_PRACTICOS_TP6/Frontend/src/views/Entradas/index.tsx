import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, InputNumber, Select, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";

const visitanteSchema = z.object({
    edad: z
        .number()
        .min(0, "Debe ser mayor o igual a 0")
        .max(120, "Edad no válida"),
    tipo: z.enum(["Regular", "VIP"], "Seleccione un tipo de pase"),
});

const schema = z.object({
    fecha: z.date("Seleccione una fecha"),
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
            formaPago: "Efectivo",
            visitantes: [{ edad: 0, tipo: "Regular" }],
        },
    });

    const { fields, append, replace } = useFieldArray({
        control: methods.control,
        name: "visitantes",
    });

    const cantidad = methods.watch("visitantes").length;

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
    };

    const disabledDate = (current: Dayjs) => {
        const now = dayjs();
        const today = now.startOf("day");

        // Si son las 19:00 o más, bloquear el día actual
        const isAfterClosing = now.hour() >= 19;

        // Deshabilita fechas pasadas o el día actual si el parque ya cerró
        if (
            current < today ||
            (isAfterClosing && current.isSame(today, "day"))
        ) {
            return true;
        }

        // Deshabilita lunes
        if (current.day() === 1) return true;

        // Deshabilita 25 de diciembre
        const isChristmas = current.date() === 25 && current.month() === 11;

        // Deshabilita 1 de enero
        const isNewYear = current.date() === 1 && current.month() === 0;

        return isChristmas || isNewYear;
    };

    return (
        <div>
            <div className="bg-white rounded-md shadow-xl flex flex-col gap-2 p-6 w-3xl m-auto max-w-9/10">
                <div>
                    <p className="text-2xl w-full text-center font-semibold">
                        Compra de Entradas
                    </p>
                </div>
                <form
                    className="flex flex-col gap-4 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="flex gap-4 w-full">
                        <div className="flex flex-col w-full">
                            <label>Fecha de visita:</label>
                            <Controller
                                control={methods.control}
                                name="fecha"
                                render={({ field }) => (
                                    <DatePicker
                                        format={{
                                            format: "DD/MM/YYYY",
                                            type: "mask",
                                        }}
                                        size="large"
                                        placeholder="Fecha"
                                        disabledDate={disabledDate}
                                        onChange={(value) =>
                                            field.onChange(
                                                value?.toDate() ?? undefined
                                            )
                                        }
                                        value={
                                            field.value
                                                ? dayjs(field.value)
                                                : null
                                        }
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>Cantidad de entradas:</label>
                            <Select
                                options={Array.from({ length: 10 }, (_, i) => ({
                                    value: i + 1,
                                    label: (i + 1).toString(),
                                }))}
                                size="large"
                                value={cantidad}
                                onChange={handleCantidadChange}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>Forma de pago:</label>
                            <Controller
                                control={methods.control}
                                name="formaPago"
                                render={({ field }) => (
                                    <Select
                                        options={[
                                            {
                                                value: "Efectivo",
                                                label: "Efectivo",
                                            },
                                            {
                                                value: "Tarjeta",
                                                label: "Tarjeta",
                                            },
                                        ]}
                                        size="large"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {methods.formState.errors.formaPago && (
                                <p className="text-red-500 text-sm">
                                    {methods.formState.errors.formaPago.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="rounded-md overflow-hidden border border-pakistan-green">
                        <table className="w-full text-sm text-left rtl:text-right text-pakistan-green">
                            <thead className="text-base text-nyanza uppercase bg-pakistan-green text-center">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Visitante
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Edad
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tipo de Pase
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="overflow-y-auto max-h-[450px]">
                                {fields.map((field, index) => (
                                    <tr
                                        key={field.id}
                                        className="bg-white border-b  border-gray-200 text-base text-center"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-bold whitespace-nowrap text-lg"
                                        >
                                            Visitante {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            <Controller
                                                control={methods.control}
                                                name={`visitantes.${index}.edad`}
                                                render={({ field }) => (
                                                    <InputNumber
                                                        min={0}
                                                        max={120}
                                                        value={field.value}
                                                        onChange={(val) =>
                                                            field.onChange(
                                                                val ?? 0
                                                            )
                                                        }
                                                        className="w-24"
                                                    />
                                                )}
                                            />
                                            {methods.formState.errors
                                                .visitantes?.[index]?.edad && (
                                                <p className="text-red-500 text-sm">
                                                    {
                                                        methods.formState.errors
                                                            .visitantes[index]
                                                            ?.edad?.message
                                                    }
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Controller
                                                control={methods.control}
                                                name={`visitantes.${index}.tipo`}
                                                render={({ field }) => (
                                                    <Select
                                                        options={[
                                                            {
                                                                value: "Regular",
                                                                label: "Regular",
                                                                desc: "Regular ($5000)",
                                                            },
                                                            {
                                                                value: "VIP",
                                                                label: "VIP",
                                                                desc: "VIP ($10000)",
                                                            },
                                                        ]}
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        className="w-36 text-start"
                                                        optionRender={(
                                                            option
                                                        ) => (
                                                            <Space>
                                                                {
                                                                    option.data
                                                                        .desc
                                                                }
                                                            </Space>
                                                        )}
                                                    />
                                                )}
                                            />
                                            {methods.formState.errors
                                                .visitantes?.[index]?.tipo && (
                                                <p className="text-red-500 text-sm">
                                                    {
                                                        methods.formState.errors
                                                            .visitantes[index]
                                                            ?.tipo?.message
                                                    }
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="mt-4 bg-pakistan-green hover:bg-green-700"
                    >
                        Confirmar compra
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Entradas;
