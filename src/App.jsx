import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Feed from './components/feed';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchVideos(currentPage);
  }, [currentPage]);

  const fetchVideos = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://internship-service.onrender.com/videos?page=${page}`);
      const videosData = response.data.data.posts.map((video) => ({
        ...video,
        playing: false,
      }));
      setVideos(videosData);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.log('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailClick = (video) => {
    const videoIndex = videos.findIndex((v) => v.postId === video.postId);

    if (videoIndex === selectedVideoIndex) {
      setSelectedVideoIndex(null);
    } else {
      setSelectedVideoIndex(videoIndex);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {videos.length > 0 && (
          <Feed
            videos={videos}
            handleThumbnailClick={handleThumbnailClick}
            selectedVideoIndex={selectedVideoIndex}
          />
        )}
        {videos.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-800 text-gray-400 cursor-default' : 'bg-gray-700 text-gray-200'} font-semibold`}
            >
              First Page
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-800 text-gray-400 cursor-default' : 'bg-gray-700 text-gray-200'} font-semibold ml-2`}
            >
              Previous Page
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-800 text-gray-400 cursor-default' : 'bg-gray-700 text-gray-200'} font-semibold ml-2`}
            >
              Next Page
            </button>
            <span className="text-gray-400 text-sm mx-2">Page {currentPage}</span>
          </div>
        )}
      </div>
      <footer className="bg-gray-800 text-gray-400 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} YouTube Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
