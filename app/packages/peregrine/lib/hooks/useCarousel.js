import { useCallback, useMemo, useState, useEffect } from 'react';

const sortImages = (images = []) => images.filter(({ disabled }) => !disabled).sort((a, b) => a.position - b.position);

/**
 * A hook for interacting with the state of a carousel of images.
 *
 * @param {Array} images an array of image objects
 * @param {number} startIndex the index at which to start the carousel
 */
export const useCarousel = (images = [], startIndex = 0) => {
    const [activeItemIndex, setActiveItemIndex] = useState(startIndex);
    const [initialIndex, setInitialIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(3);

    const sortedImages = useMemo(() => sortImages(images), [images]);

    const handlePrevious = useCallback(() => {
        setActiveItemIndex(prevIndex => {
            if (prevIndex > 0) {
                return prevIndex - 1;
            } else {
                return images.length - 1;
            }
        });
    }, [images]);

    const handleNext = useCallback(() => {
        // If we're on the last image we want to go to the first.
        setActiveItemIndex(prevIndex => (prevIndex + 1) % images.length);
    }, [images]);

    const api = useMemo(() => ({ handlePrevious, handleNext, setActiveItemIndex }), [
        handlePrevious,
        handleNext,
        setActiveItemIndex
    ]);

    useEffect(() => {
        if (activeItemIndex > 3) {
            setInitialIndex(prev => prev + 1);
            setLastIndex(prev => prev + 1);
        } else if (initialIndex > 0) {
            setInitialIndex(prev => prev - 1);
            setLastIndex(prev => prev - 1);
        } else if (lastIndex >= images.length - 1) {
            setInitialIndex(0);
            setLastIndex(3);
        }
    }, [activeItemIndex, images]);

    const state = {
        activeItemIndex,
        sortedImages,
        initialIndex,
        lastIndex
    };

    return [state, api];
};
