import React, { useEffect, useState } from 'react';
import { CategoryLink } from './category-link';
import { ListWrapper } from '../components/list-wrapper';
import './categories.css';
import { apiGet } from '../apiHelpers';
import { useCategory } from '../Category-contetxt';

interface CategoriesProps {
    mode: 'view' | 'edit' | 'multi-edit';
    building_id?: number;
}

interface Category {
    id: number;
    name: string;
    abouturl: string | null;
    inactive: boolean;
    color: string;
}

// Function to fetch categories data from the API
const fetchMainCategories = async (): Promise<Category[] | null> => {
    try {
        const data = await apiGet(`/api/categories`);
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
};

const Categories: React.FC<CategoriesProps> = (props) => {
    console.log("categories.tsx");
    console.log(props);

    const [categories, setCategories] = useState<Category[]>([]); 
    const { categoryId, setCategoryId } = useCategory(); // Use context

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCategories = await fetchMainCategories();
            if (fetchedCategories) {
                setCategories(fetchedCategories);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log('Current category ID:', categoryId);
    }, [categoryId]);

    const handleCategoryClick = (id: number) => {
        console.log("Setting category ID to:", id);
        setCategoryId(id);
    };

    return (
        <ListWrapper className="data-category-list">
            {categories.map((category) => (
                <CategoryLink
                    key={category.id}
                    category_id={category.id}
                    title={category.name}
                    slug={category.name.toLowerCase().replace(/\s+/g, '-') || ''}
                    help={category.abouturl || ''}
                    inactive={category.inactive}
                    mode={props.mode}
                    building_id={props.building_id}
                    color={category.color}
                    onClick={() => handleCategoryClick(category.id)}
                />
            ))}
        </ListWrapper>
    );
};

export default Categories;
