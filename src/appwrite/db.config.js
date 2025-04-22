import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

class Service {
  client = new Client();
  database;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    const postData = {
      title,
      content,
      featuredImage,
      status,
      userId,
    };
    console.log(postData, slug);
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        postData
      );
    } catch (error) {
      console.log("Databse service ERROR : createPost : ", error);
      return error;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    const postData = {
      title,
      content,
      featuredImage,
      status,
    };
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        postData
      );
    } catch (error) {
      console.log("Databse service ERROR : updatePost : ", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Databse service ERROR : deletePost  : ", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Databse service ERROR : getPost : ", error);
      return false;
    }
  }
  async getPosts(query = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        query
      );
    } catch (error) {
      console.log("Databse service ERROR : getPosts : ", error);
      return false;
    }
  }

  // file upload service
  async uploadFile(file) {
    console.log(file);
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Storage service ERROR : uploadFile : ", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Storage service ERROR : deleteFile : ", error);
      return false;
    }
  }
  getFilePreview(fileId){
    return this.storage.getFileDownload(config.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service
