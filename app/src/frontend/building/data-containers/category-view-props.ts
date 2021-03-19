import { Building } from '../../models/building';

interface CopyProps {
    copying: boolean;
    toggleCopying: () => void;
    toggleCopyAttribute: (key: string) => void;
    copyingKey: (key: string) => boolean;
}

interface CategoryViewProps {
    intro: string;
    building: Building;
    building_like: boolean;
    mode: 'view' | 'edit' | 'multi-edit';
    edited: boolean;
    copy: CopyProps;
    onChange: (key: string, value: any) => void;
    onLike: (like: boolean) => void;
    onVerify: (slug: string, verify: boolean, x: number, y: number) => void;

    /* Special handler for adding and immediately saving a new item of an array-like attribute */
    onSaveAdd: (slug: string, newItem: any) => void;

    /* Special handler for setting a value and immediately saving */
    onSaveChange: (slug: string, value: any) => void;

    user_verified: any;
    user?: any;
}

export {
    CategoryViewProps,
    CopyProps
};
