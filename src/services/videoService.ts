import { Sequelize,Op } from 'sequelize';
import Video from '../models/video';

export const addVideo = async (video: { title: string; description: string; duration: number; genre: string; tags: string }) => {
  const newVideo = await Video.create(video);
  return newVideo;
};

export const updateVideo = async (id: number, video: { title: string; description: string; duration: number; genre: string; tags: string }) => {
  const videoToUpdate = await Video.findByPk(id);
  if (!videoToUpdate) {
    throw new Error('Video not found');
  }
  await videoToUpdate.update(video);
  return videoToUpdate;
};

export const getVideos = async (filters: { genre?: string; tags?: string; limit?: number; offset?: number }) => {
  const { genre, tags, limit = 10, offset = 0 } = filters;

  const queryOptions: any = {
    where: {},
    limit,
    offset,
  };

  if (genre) {
    queryOptions.where.genre = genre;
  }

  if (tags) {
    queryOptions.where.tags = {
      [Op.like]: `%${tags}%`,
    };
  }

  const videos = await Video.findAll(queryOptions);
  return videos;
};

export const deleteVideo = async (id: number) => {
  const videoToDelete = await Video.findByPk(id);
  if (!videoToDelete) {
    throw new Error('Video not found');
  }
  await videoToDelete.destroy();
};
