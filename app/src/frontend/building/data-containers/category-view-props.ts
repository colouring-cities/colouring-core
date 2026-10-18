import { Building, BuildingAttributes } from '../../models/building';
import { BuildingMapTileset } from '../../config/tileserver-config';

interface CopyProps {
    copying: boolean;
    toggleCopying: () => void;
    toggleCopyAttribute: (key: string) => void;
    copyingKey: (key: string) => boolean;
}

function initCopyProps(options?: Partial<CopyProps>): CopyProps {
    const defaults = {
        copying: true,
        toggleCopying: undefined
    };

    return {
        ...defaults,
        ...options,
    };
}

const defaultCopyProps: CopyProps = initCopyProps();

interface CategoryViewProps {
    intro: string;
    building: Building;
    mode: 'view' | 'edit' | 'multi-edit';
    edited: boolean;
    copy: defaultCopyProps;
    onChange: (key: string, value: any) => void;
    onVerify: (slug: string, verify: boolean, x: number, y: number) => void;

    /* Special handler for adding and immediately saving a new item of an array-like attribute */
    onSaveAdd: (slug: string, newItem: any) => void;

    /* Special handler for setting a value and immediately saving */
    onSaveChange: (slug: string, value: any) => void;

    user_verified: any;
    user?: any;

    mapColourScale: BuildingMapTileset;
    onMapColourScale: (x: BuildingMapTileset) => void;
}

export {
    CategoryViewProps,
    CopyProps
};
