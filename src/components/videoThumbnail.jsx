import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';

const VideoThumbnail = ({ video, onThumbnailClick, isSelected }) => {
    const [playing, setPlaying] = useState(false);

    const handleClick = () => {
        setPlaying((prevPlaying) => !prevPlaying);
        onThumbnailClick(video);
    };

    useEffect(() => {
        if (!isSelected) {
            setPlaying(false);
        }
    }, [isSelected]);

    return (
        <motion.div
            className={`cursor-pointer ${isSelected ? 'border-blue-500 border-2' : ''} p-5`}
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            <div className="relative">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <img src={video.submission.thumbnail} alt={video.submission.title} className="object-cover w-full h-full" />
                    {isSelected && playing && (
                        <div className="absolute inset-0">
                            <ReactPlayer
                                url={video.submission.mediaUrl}
                                playing={playing}
                                controls
                                width="100%"
                                height="100%"
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <div className="absolute bottom-0 right-0 m-2 px-1 bg-black bg-opacity-75 rounded">
                        <span className="text-white text-xs font-semibold">{video.duration}</span>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <h3 className="text-base font-semibold line-clamp-2 text-white">{video.submission.title}</h3>
                <p className="text-xs text-gray-300 line-clamp-3">{video.submission.description}</p>
                <div className="flex items-center mt-3">
                    <img src={video.creator.pic} alt={video.creator.name} className="w-6 h-6 rounded-full mr-2" />
                    <p className="text-xs text-gray-300">{video.creator.name}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default VideoThumbnail