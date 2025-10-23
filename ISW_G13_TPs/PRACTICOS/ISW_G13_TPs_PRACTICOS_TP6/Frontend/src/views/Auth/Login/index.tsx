import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { usuariosMock } from "../../../mocks/usuarios.mock.js"; 

const signInSchema = z.object({
    email: z.email("Debe ser un email valido."),
    password: z.string().min(6, "La contraseña debe ser minimo 6 caracteres."),
});

type FormValues = z.infer<typeof signInSchema>;

function Login() {
    const [hiddenPass, setHiddenPass] = useState<"text" | "password">(
        "password"
    );
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const methods = useForm<FormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        const usuarioValido = usuariosMock.find(
            (usuario) => usuario.email === data.email
        );

        if (usuarioValido) {
            login(data.email);
            navigate("/entradas");
        } else {
            Swal.fire({
                icon: "error",
                title: "Email no encontrado",
                text: "El email ingresado no se encuentra registrado. Por favor, verifica tus datos.",
                confirmButtonColor: "var(--color-pakistan-green)", 
            });
        }
    };

    const onChangeHiddenPass = () => {
        if (hiddenPass === "password") {
            setHiddenPass("text");
        } else if (hiddenPass === "text") {
            setHiddenPass("password");
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                className="text-xl flex flex-col gap-4"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col">
                    <label>Usuario</label>
                    <input
                        {...methods.register("email", {
                            required: true,
                        })}
                        type="text"
                    />
                    <p className="text-sm text-red-500">
                        {methods.formState.errors.email?.message}
                    </p>
                </div>

                <div className="flex flex-col">
                    <label>Contraseña</label>
                    <div className="flex gap-2">
                        <input
                            {...methods.register("password", {
                                required: true,
                            })}
                            type={hiddenPass}
                            className="w-full"
                        />
                        <button
                            type="button"
                            className="primary"
                            onClick={onChangeHiddenPass}
                        >
                            {hiddenPass === "password" ? (
                                <EyeIcon />
                            ) : (
                                <EyeSlashIcon />
                            )}
                        </button>
                    </div>
                    <p className="text-sm text-red-500">
                        {methods.formState.errors.password?.message}
                    </p>
                </div>
                <button type="submit" className="primary mt-5">
                    Ingresar
                </button>
            </form>
        </FormProvider>
    );
}

export default Login;