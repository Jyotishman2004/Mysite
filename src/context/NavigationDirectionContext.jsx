import { createContext, useContext, useState, useCallback } from 'react';

/**
 * Shares navigation direction between swipe gesture hook and page transitions.
 *   'left'  = swiped left → going to next page (content slides out left, new slides from right)
 *   'right' = swiped right → going to prev page (content slides out right, new slides from left)
 *   null    = regular navigation (use default glitch transition)
 */
const NavigationDirectionContext = createContext({
    direction: null,
    setDirection: () => {},
});

export function NavigationDirectionProvider({ children }) {
    const [direction, setDirectionState] = useState(null);

    const setDirection = useCallback((dir) => {
        setDirectionState(dir);
    }, []);

    return (
        <NavigationDirectionContext.Provider value={{ direction, setDirection }}>
            {children}
        </NavigationDirectionContext.Provider>
    );
}

export function useNavigationDirection() {
    return useContext(NavigationDirectionContext);
}
