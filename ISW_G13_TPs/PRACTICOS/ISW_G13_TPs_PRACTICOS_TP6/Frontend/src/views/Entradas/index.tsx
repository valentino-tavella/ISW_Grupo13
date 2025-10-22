import {useEntradaMutations} from "@/hooks/useEntradaMutations";
import {useAuthStore} from "@/store/auth-store";
import {zodResolver} from "@hookform/resolvers/zod";
import {HouseIcon} from "@phosphor-icons/react";
import {DatePicker, ConfigProvider, InputNumber, Select, Space} from "antd";
import dayjs, {Dayjs} from "dayjs";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Navigate, useNavigate} from "react-router";
import z from "zod";
import Swal from "sweetalert2";

// --- ESQUEMAS Y LÓGICA (SIN CAMBIOS) ---
const visitanteSchema = z.object({
    edad: z
        .number()
        .min(0, "Debe ser mayor o igual a 0")
        .max(120, "Edad no válida"),
    tipo: z.enum(["regular", "VIP"], "Seleccione un tipo de pase"),
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
    const navigate = useNavigate();
    const {email} = useAuthStore();
    const {comprarEntradaMutation} = useEntradaMutations();
    const methods = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            fecha: undefined,
            formaPago: "Efectivo",
            visitantes: [{edad: 0, tipo: "regular"}],
        },
    });

    const {fields, append, replace} = useFieldArray({
        control: methods.control,
        name: "visitantes",
    });

    const visitantes = methods.watch("visitantes");
    const cantidad = visitantes.length;

    const handleCantidadChange = (value: number) => {
        if (value > fields.length) {
            const nuevos = Array(value - fields.length)
                .fill(null)
                .map(() => ({edad: 0, tipo: "regular" as const}));
            append(nuevos);
        } else {
            replace(fields.slice(0, value));
        }
    };

  const onSubmit = (data: FormData) => {
    if (email)
        comprarEntradaMutation.mutate(
            {
                fecha: data.fecha.toISOString(),
                formaPago: data.formaPago.toLocaleLowerCase(),
                email: email,
                entradas: data.visitantes.map((value) => ({
                    edad_visitante: value.edad,
                    tipoPase: value.tipo,
                })),
            },
            {
                onSuccess: async () => {
                    await Swal.fire({
                        title: "Compra realizada con éxito",
                        html: `
                            Te llegará un mail de confirmación.<br>
                            Cantidad de entradas compradas: ${data.visitantes.length}<br>
                            Fecha: ${new Date(data.fecha).toLocaleDateString("es-AR", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        `,
                        icon: "success",
                        showConfirmButton: false,
                        iconColor: "#3da35d",
                        timer: 5000,
                        customClass: {
                            popup: "bg-nyanza!",
                            title: "text-pakistan-green!",
                            htmlContainer: "text-pakistan-green!",
                        },
                    });
                    await navigate("/");
                },
                onError: async (data) => {
                    await Swal.fire({
                        title: "Ups... Algo pasó!",
                        text: `Motivo: ${data.response?.data.mensaje}`,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 5000,
                        customClass: {
                            popup: "bg-nyanza!",
                            title: "text-pakistan-green!",
                            htmlContainer: "text-pakistan-green!",
                        },
                    });
                },
            }
        );
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

    const precios = {regular: 5000, VIP: 10000};
    const totalCompra = visitantes.reduce((acc, visitante) => {
        const precio = precios[visitante.tipo] || 0;
        return acc + precio;
    }, 0);

    if (!email) return <Navigate to="/auth/login"/>;


    // --- RENDERIZADO CON DISEÑO RESPONSIVE MEJORADO ---
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#134611',
                    borderRadius: 6,
                    fontFamily: 'inherit',
                    colorLink: '#3E8914',
                    colorLinkHover: '#3DA35D',
                },
            }}
        >
            <div>
                <div className="bg-white rounded-md shadow-xl flex flex-col gap-2 p-6 w-xl m-auto max-w-9/10 relative">
                    <button
                        className="primary absolute"
                        onClick={() => navigate("/")}
                    >
                        <HouseIcon weight="fill" size={24}/>
                    </button>
                    <div className="h-12">
                        <p className="text-2xl w-full text-center font-semibold">
                            Compra de Entradas
                        </p>
                    </div>
                    <form
                        className="flex flex-col gap-4 w-full"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div className="flex gap-4 w-full items-end">
                            <div className="flex flex-col w-full">
                                <label>Fecha de visita:</label>
                                <Controller
                                    control={methods.control}
                                    name="fecha"
                                    render={({field}) => (
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
                                {methods.formState.errors.fecha && (
                                    <p className="text-red-500 text-sm">
                                        {methods.formState.errors.fecha.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col w-full">
                                <label>Cantidad de entradas:</label>
                                <Select
                                    size="large"
                                    value={cantidad}
                                    onChange={handleCantidadChange}
                                    options={Array.from({length: 10}, (_, i) => ({
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
                                    render={({field}) => (
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
                                                render={({field}) => (
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
                                                render={({field}) => (
                                                    <Select
                                                        options={[
                                                            {
                                                                value: "regular",
                                                                label: "regular",
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
                        <div className="text-right mt-2">
                            <p className="text-lg font-medium text-gray-600">Total a Pagar:</p>
                            <p className="text-2xl md:text-3xl font-bold text-pakistan-green">
                                {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(totalCompra)}
                            </p>
                        </div>
                        <button className="primary">Confirmar compra</button>
                    </form>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default Entradas;
