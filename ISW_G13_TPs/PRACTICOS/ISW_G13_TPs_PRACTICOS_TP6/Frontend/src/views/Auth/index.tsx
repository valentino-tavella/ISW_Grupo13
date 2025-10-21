import { Outlet, useNavigate } from "react-router";

function Auth() {
    const navigate = useNavigate()
    return (
        <div className="flex items-center w-full min-h-screen justify-center">
            <div className="bg-light-green border border-india-green rounded-md flex flex-col gap-2 items-center p-6 relative">
                <button className="primary absolute top-0 left-0 translate-2" onClick={() => navigate("/")}>
                    Volver
                </button>
                <div className="">Logo</div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Auth;
