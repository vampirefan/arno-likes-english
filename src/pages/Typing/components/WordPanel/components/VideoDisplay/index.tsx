import type React from 'react';
import { useEffect, useState } from 'react';

interface VideoDisplayProps {
    word: string;
    className?: string; // 接收自定义类名
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ word, className }) => {
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [lastFetchedWord, setLastFetchedWord] = useState<string>('');
    const apiKey = '47086577-a0ccf2640de90291483bb2cb9';

    useEffect(() => {
        if (word && word !== lastFetchedWord) {
            fetchVideo(word);
        }
    }, [word]);

    const fetchVideo = async (query: string) => {
        setLoading(true);
        try {
            const response = await fetch(`https://pixabay.com/api/videos/?key=${apiKey}&q=${encodeURIComponent(query)}&per_page=3`);
            const data = await response.json();
            if (data.hits && data.hits.length > 0) {
                setVideoUrl(data.hits[0].videos.large.url); // 获取第一条视频的URL
                setLastFetchedWord(query);
            } else {
                setVideoUrl('');
            }
        } catch (error) {
            console.error('Failed to fetch video:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`relative ${className} flex items-center justify-center`}>
            {loading ? (
                <div className="w-full h-full bg-gray-300 rounded-md relative overflow-hidden animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-slide"></div>
                </div>
            ) : (
                videoUrl ? (
                    <video 
                        controls 
                        width='500px'
                        autoPlay
                        muted
                        className="object-cover rounded-md"
                        src={videoUrl} 
                    />
                ) : (
                    <p>视频未找到</p>
                )
            )}
        </div>
    );
};

export default VideoDisplay;
