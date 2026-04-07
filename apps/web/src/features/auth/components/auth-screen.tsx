import { useState } from "react";
import type { SignInFlow } from "../types";

export const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn");
    return (
        <div className="h-full flex items-center justify-center bg-background ">
            Auth Screen
        </div>
    );
};
