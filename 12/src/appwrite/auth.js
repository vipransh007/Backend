import conf from '../conf/config.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            await this.account.create(ID.unique(), email, password, name);
            return this.login({ email, password });
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        if (error.code === 401) {
            // No session, user is not logged in
            return null;
        }
        console.error("Appwrite service :: getCurrentUser :: error", error);
        throw error; // Re-throw if it's another type of error
    }
}


    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
