import conf from "../conf/config.js";

import { Client, ID, Databases, Storage, Query} from "appwrite";

export class Service {
    client = new Client();
    Databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.Databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title , slug, content, featuerdImage,status, userId}) {
        try {
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuerdImage,
                    status: status,
                    userId: userId
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error);
            
        }
    }
    async updatePost({slug , title, content, featuerdImage,status}) {
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuerdImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error);
            return false;
        }
    }
    async getPosts(slug) {
        try {
            return await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error ", error);
        }
    }
} 

const service = new Service();
export default service;