import type User from '../types/interfaces/User'
import { URL_API_USERS } from '../env'

export class UserService {
    public async getUserById(userId: string): Promise<User | null> {
        try {
            const response = await fetch(`${URL_API_USERS}${userId}`)

            if (!response.ok) {
                const errorData = await response.json()

                if (response.status === 404) {
                    console.error(`Utilisateur introuvable: ${errorData.message}`)
                    return null
                }

                throw new Error(`Erreur HTTP: ${response.status}`)
            }
            const data = await response.json()

            const user: User = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                email: data.email,
                password: data.password,
            }

            return user

        } catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur à l'ID : ${userId}`, error)
            return null
        }
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        try {
            const response = await fetch(`${URL_API_USERS}?email=${email}`)

            if (!response.ok) {
                const errorData = await response.json()

                if (response.status === 404) {
                    console.error(`Utilisateur introuvable: ${errorData.message}`)
                    return null
                }

                throw new Error(`Erreur HTTP: ${response.status}`)
            }
            const data = await response.json()

            const user: User = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                email: data.email,
                password: data.password,
            }

            return user

        } catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur à l'email : ${email}`, error)
            return null
        }
    }

}
