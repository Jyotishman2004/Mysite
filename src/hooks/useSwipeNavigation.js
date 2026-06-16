import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigationDirection } from '../context/NavigationDirectionContext';

/**
 * Ordered list of pages for swipe navigation.
 * Swipe left → next page, swipe right → previous page.
 */
const PAGE_ORDER = ['/', '/projects', '/about', '/contact'];

const SWIPE_THRESHOLD = 50; // minimum px to count as a swipe
const SWIPE_MAX_VERTICAL = 80; // ignore if vertical movement exceeds this

export default function useSwipeNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setDirection } = useNavigationDirection();
    const touchRef = useRef({ startX: 0, startY: 0, startTime: 0 });

    useEffect(() => {
        // Only enable on touch-capable (mobile) devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (!isTouchDevice) return;

        function handleTouchStart(e) {
            const touch = e.touches[0];
            touchRef.current = {
                startX: touch.clientX,
                startY: touch.clientY,
                startTime: Date.now(),
            };
        }

        function handleTouchEnd(e) {
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchRef.current.startX;
            const deltaY = touch.clientY - touchRef.current.startY;
            const elapsed = Date.now() - touchRef.current.startTime;

            // Ignore slow drags (> 600ms) and vertical scrolls
            if (elapsed > 600) return;
            if (Math.abs(deltaY) > SWIPE_MAX_VERTICAL) return;
            if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

            const currentIndex = PAGE_ORDER.indexOf(location.pathname);
            if (currentIndex === -1) return; // not on a navigable page (e.g. 404)

            let nextIndex;
            let swipeDir;

            if (deltaX < 0) {
                // Swiped left → go to next page
                nextIndex = currentIndex + 1;
                swipeDir = 'left';
            } else {
                // Swiped right → go to previous page
                nextIndex = currentIndex - 1;
                swipeDir = 'right';
            }

            if (nextIndex >= 0 && nextIndex < PAGE_ORDER.length) {
                setDirection(swipeDir);
                navigate(PAGE_ORDER[nextIndex]);
            }
        }

        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [navigate, location.pathname, setDirection]);
}
