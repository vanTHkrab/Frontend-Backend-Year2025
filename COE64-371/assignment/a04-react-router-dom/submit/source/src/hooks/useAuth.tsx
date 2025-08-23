import { useState } from "react";
export function useAuth() {
// ัวอย่าง state จําลอง (ปกิคุณจะึงจาก context หรือ global store)
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem("demo_user");
        return raw ? JSON.parse(raw) : null;
    });
    const login = (username = "demo") => {
        const u = { name: username };
        localStorage.setItem("demo_user", JSON.stringify(u));
        setUser(u);
    };
    const logout = () => {
        localStorage.removeItem("demo_user");
        setUser(null);
    };
    return { user, login, logout };
}