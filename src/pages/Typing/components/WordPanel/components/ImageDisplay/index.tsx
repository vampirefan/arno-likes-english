import type React from 'react';
import { useEffect, useState } from 'react';

interface ImageDisplayProps {
    word: string;
    className?: string; // 接收自定义类名
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ word, className }) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [lastFetchedWord, setLastFetchedWord] = useState<string>('');
    const apiKey = '47086577-a0ccf2640de90291483bb2cb9';

    useEffect(() => {
        if (word && word !== lastFetchedWord) {
            fetchImage(word);
        }
    }, [word]);

    const fetchImage = async (query: string) => {
        setLoading(true);
        try {
            const imageCount = 10
            const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=` + imageCount);
            const data = await response.json();
            if (data.hits && data.hits.length > imageCount - 1) {
                // 这里给个随机数，让每次出现的图片不大一样，增加新鲜感
                setImageUrl(data.hits[Math.floor(Math.random() * imageCount)].webformatURL);
                setLastFetchedWord(query);
            } else {
                setImageUrl('');
            }
        } catch (error) {
            console.error('Failed to fetch image:', error);
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
                imageUrl ? (
                    <img src={imageUrl} alt={word} className="w[500px] h-auto object-cover rounded-md" />
                ) : (
                    <p>图片未找到</p>
                )
            )}
        </div>
    );
};

export default ImageDisplay;
