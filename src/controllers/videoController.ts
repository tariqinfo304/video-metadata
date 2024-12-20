import { Request, Response } from 'express';
import { addVideo, updateVideo, getVideos, deleteVideo } from '../services/videoService';
import Redis from 'ioredis';


const redis = new Redis();

export const createVideo = async (req: Request, res: Response) => {
  try {
    const { title, description, duration, genre, tags } = req.body;
    const newVideo = await addVideo({ title, description, duration, genre, tags });
    await redis.flushdb();
    res.status(201).json({ message: 'Video created', video: newVideo });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const modifyVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, duration, genre, tags } = req.body;
    const updatedVideo = await updateVideo(Number(id), { title, description, duration, genre, tags });
    await redis.flushdb();
    res.status(200).json({ message: 'Video updated', video: updatedVideo });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchVideos = async (req: Request, res: Response) => {
  try {
    const { genre, tags, limit, offset } = req.query;

    const cacheKey:any = `videos:${genre}:${tags}:${limit}:${offset}`;
    const cachedData: any = await redis.get(cacheKey);
    if (cachedData) {
      res.status(200).json({ videos: JSON.parse(cachedData) });
      return;
    }

    const videos = await getVideos({
      genre: genre as string,
      tags: tags as string,
      limit: Number(limit),
      offset: Number(offset),
    });

    await redis.set(cacheKey, JSON.stringify(videos), 'EX', 3600);
    res.status(200).json({ videos });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};




export const removeVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteVideo(Number(id));
    await redis.flushdb();
    res.status(200).json({ message: 'Video deleted' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
