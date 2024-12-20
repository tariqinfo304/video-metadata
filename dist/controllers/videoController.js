"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVideo = exports.fetchVideos = exports.modifyVideo = exports.createVideo = void 0;
const videoService_1 = require("../services/videoService");
const createVideo = async (req, res) => {
    try {
        const { title, description, duration, genre, tags } = req.body;
        const newVideo = await (0, videoService_1.addVideo)({ title, description, duration, genre, tags });
        res.status(201).json({ message: 'Video created', video: newVideo });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createVideo = createVideo;
const modifyVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, duration, genre, tags } = req.body;
        const updatedVideo = await (0, videoService_1.updateVideo)(Number(id), { title, description, duration, genre, tags });
        res.status(200).json({ message: 'Video updated', video: updatedVideo });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.modifyVideo = modifyVideo;
const fetchVideos = async (req, res) => {
    try {
        const { genre, tags, limit, offset } = req.query;
        const videos = await (0, videoService_1.getVideos)({
            genre: genre,
            tags: tags,
            limit: Number(limit),
            offset: Number(offset),
        });
        res.status(200).json({ videos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.fetchVideos = fetchVideos;
const removeVideo = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, videoService_1.deleteVideo)(Number(id));
        res.status(200).json({ message: 'Video deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removeVideo = removeVideo;
