import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface CategoryContextState {
    categoryId: number | null;
    setCategoryId: (id: number) => void;
    resetCategoryId: () => void;
}

const stub = (): never => {
    throw new Error('CategoryProvider not set up');
};

// Create the context with default values
export const CategoryContext = createContext<CategoryContextState>({
    categoryId: null,
    setCategoryId: stub,
    resetCategoryId: stub,
});

interface CategoryProviderProps {
    initialCategoryId?: number;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children, initialCategoryId }) => {
    const [categoryId, setCategoryId] = useState<number | null>(initialCategoryId || null);

    // Function to update category ID
    const updateCategoryId = useCallback((id: number) => {
        setCategoryId(id);
    }, []);

    // Function to reset category ID
    const resetCategoryId = useCallback(() => {
        setCategoryId(null);
    }, []);

    return (
        <CategoryContext.Provider value={{ categoryId, setCategoryId: updateCategoryId, resetCategoryId }}>
            {children}
        </CategoryContext.Provider>
    );
};

// Custom hook to access category context
export const useCategory = (): CategoryContextState => {
    return useContext(CategoryContext);
};
