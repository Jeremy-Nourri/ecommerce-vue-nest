import type User from "@/types/interfaces/User";
import FetchError from "@/utils/error/FetchError";

const URL_API_AUTH = import.meta.env.VITE_URL_API_AUTH;

export class AuthService {

    public async login(username: string, password: string): Promise<User | null> {
        try {
            const response = await fetch(URL_API_AUTH, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new FetchError(response.statusText, response.status, await response.json());
            }

            return await response.json();
            
        } catch (error) {
            console.error("Erreur lors de la connexion de l'utilisateur", error);
            return null;
        }
    }


}