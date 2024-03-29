import { request } from '@/lib/api/common/server';

import { getCurrentUserId, IGetCurrentUserResponse } from './authApiClient.server';

jest.mock('@/lib/api/common/server', () => ({
  request: jest.fn(),
}));

describe('authApiClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentUserId', () => {
    it('should return Ok result with userId on success', async () => {
      // Arrange
      const mockUserId = 'user1';
      const mockResponse: IGetCurrentUserResponse = { userId: mockUserId };
      (request as jest.Mock).mockResolvedValue(mockResponse);

      // Act
      const result = await getCurrentUserId();

      // Assert
      expect(result.ok).toBeTruthy();
      expect(result.unwrap()).toEqual(mockResponse);
      expect(request).toHaveBeenCalledWith({
        url: expect.stringContaining('/auth/me'),
        method: 'GET',
      });
    });

    it('should return Err result if API request fails', async () => {
      // Arrange
      const mockError = new Error('API error');
      (request as jest.Mock).mockRejectedValue(mockError);

      // Act
      const result = await getCurrentUserId();

      // Assert
      expect(result.err).toBeTruthy();
      expect(result.unwrapError()).toEqual(mockError.message);
    });
  });
});
