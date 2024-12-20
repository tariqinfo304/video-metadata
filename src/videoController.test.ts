import { Request, Response } from 'express';
import { createVideo, modifyVideo, fetchVideos, removeVideo } from './controllers/videoController';
import { addVideo, updateVideo, getVideos, deleteVideo } from './services/videoService';

jest.mock('./services/videoService', () => ({
  addVideo: jest.fn(),
  updateVideo: jest.fn(),
  getVideos: jest.fn(),
  deleteVideo: jest.fn(),
}));

describe('Video Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    req = { body: {}, params: {}, query: {} };
    res = { status: statusMock, json: jsonMock };
  });

  describe('createVideo', () => {
    it('should create a new video and return 201 status', async () => {
      (addVideo as jest.Mock).mockResolvedValue({ id: 1, title: 'Sample Video' });

      req.body = { title: 'Sample Video', description: 'Test', duration: 120, genre: 'Action', tags: ['fun'] };
      await createVideo(req as Request, res as Response);

      expect(addVideo).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Video created',
        video: { id: 1, title: 'Sample Video' },
      });
    });

    it('should handle errors and return 500 status', async () => {
      (addVideo as jest.Mock).mockRejectedValue(new Error('Service Error'));

      await createVideo(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Service Error' });
    });
  });

  describe('modifyVideo', () => {
    it('should update a video and return 200 status', async () => {
      (updateVideo as jest.Mock).mockResolvedValue({ id: 1, title: 'Updated Video' });

      req.params = { id: '1' };
      req.body = { title: 'Updated Video', description: 'Test', duration: 120, genre: 'Comedy', tags: ['funny'] };
      await modifyVideo(req as Request, res as Response);

      expect(updateVideo).toHaveBeenCalledWith(1, req.body);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Video updated',
        video: { id: 1, title: 'Updated Video' },
      });
    });

    it('should handle errors and return 500 status', async () => {
      (updateVideo as jest.Mock).mockRejectedValue(new Error('Service Error'));

      await modifyVideo(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Service Error' });
    });
  });

  describe('fetchVideos', () => {
    it('should fetch videos and return 200 status', async () => {
      (getVideos as jest.Mock).mockResolvedValue([{ id: 1, title: 'Fetched Video' }]);

      req.query = { genre: 'Action', tags: 'fun', limit: '10', offset: '0' };
      await fetchVideos(req as Request, res as Response);

      expect(getVideos).toHaveBeenCalledWith({
        genre: 'Action',
        tags: 'fun',
        limit: 10,
        offset: 0,
      });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ videos: [{ id: 1, title: 'Fetched Video' }] });
    });

    it('should handle errors and return 500 status', async () => {
      (getVideos as jest.Mock).mockRejectedValue(new Error('Service Error'));

      await fetchVideos(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Service Error' });
    });
  });

  describe('removeVideo', () => {
    it('should delete a video and return 200 status', async () => {
      (deleteVideo as jest.Mock).mockResolvedValue(true);

      req.params = { id: '1' };
      await removeVideo(req as Request, res as Response);

      expect(deleteVideo).toHaveBeenCalledWith(1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Video deleted' });
    });

    it('should handle errors and return 500 status', async () => {
      (deleteVideo as jest.Mock).mockRejectedValue(new Error('Service Error'));

      await removeVideo(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Service Error' });
    });
  });
});
