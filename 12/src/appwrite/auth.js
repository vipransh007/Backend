import conf from "../conf/config.js";

import { Client, Account , ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email , password, name}) {
        try {
            const userAccount= await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {

                return this.login({email, password});
            } else {
                throw new Error("Account creation failed");
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
            if (session) {
                return session;
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error getting current user:", error);
            throw error;
        }
        return null;
    }
    async logout() {
        try {
            await this.account.deleteSessions();
            
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
}
const authService = new AuthService();  

export default authService;