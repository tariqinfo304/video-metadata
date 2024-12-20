"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = exports.getVideos = exports.updateVideo = exports.addVideo = void 0;
const sequelize_1 = require("sequelize");
const video_1 = __importDefault(require("../models/video"));
const addVideo = async (video) => {
    const newVideo = await video_1.default.create(video);
    return newVideo;
};
exports.addVideo = addVideo;
const updateVideo = async (id, video) => {
    const videoToUpdate = await video_1.default.findByPk(id);
    if (!videoToUpdate) {
        throw new Error('Video not found');
    }
    await videoToUpdate.update(video);
    return videoToUpdate;
};
exports.updateVideo = updateVideo;
const getVideos = async (filters) => {
    const { genre, tags, limit = 10, offset = 0 } = filters;
    const queryOptions = {
        where: {},
        limit,
        offset,
    };
    if (genre) {
        queryOptions.where.genre = genre;
    }
    if (tags) {
        queryOptions.where.tags = {
            [sequelize_1.Op.like]: `%${tags}%`,
        };
    }
    const videos = await video_1.default.findAll(queryOptions);
    return videos;
};
exports.getVideos = getVideos;
const deleteVideo = async (id) => {
    const videoToDelete = await video_1.default.findByPk(id);
    if (!videoToDelete) {
        throw new Error('Video not found');
    }
    await videoToDelete.destroy();
};
exports.deleteVideo = deleteVideo;
