import React from 'react'
import VideoThumbnail from './videoThumbnail';

const Feed = ({ videos, handleThumbnailClick, selectedVideoIndex }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {videos.map((video, index) => (
                <VideoThumbnail
                    key={video.postId}
                    video={video}
                    onThumbnailClick={handleThumbnailClick}
                    isSelected={selectedVideoIndex === index}
                />
            ))}
        </div>
    );
};


export default Feed