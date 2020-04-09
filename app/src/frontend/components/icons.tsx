/**
 * Mini-library of icons
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faCaretDown, faCaretRight, faCaretUp, faCheck, faCheckDouble,
    faEye, faInfoCircle, faPaintBrush, faQuestionCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

library.add(
    faQuestionCircle,
    faInfoCircle,
    faPaintBrush,
    faTimes,
    faCheck,
    faCheckDouble,
    faAngleLeft,
    faCaretDown,
    faCaretUp,
    faCaretRight,
    faSearch,
    faEye
);

const HelpIcon = () => (
    <FontAwesomeIcon icon="question-circle" />
);

const InfoIcon = () => (
    <FontAwesomeIcon icon="info-circle" />
);

const EditIcon = () => (
    <FontAwesomeIcon icon="paint-brush" />
);

const ViewIcon = () => (
    <FontAwesomeIcon icon="eye" />
);

const CloseIcon = () => (
    <FontAwesomeIcon icon="times" />
);

const SaveIcon = () => (
    <FontAwesomeIcon icon="check" />
);

const SaveDoneIcon = () => (
    <FontAwesomeIcon icon="check-double" />
);

const BackIcon = () => (
    <FontAwesomeIcon icon="angle-left" />
);

const DownIcon = () => (
    <FontAwesomeIcon icon="caret-down" />
);

const UpIcon = () => (
    <FontAwesomeIcon icon="caret-up" />
);

const RightIcon = () => (
    <FontAwesomeIcon icon="caret-right" />
);

const SearchIcon = () => (
    <FontAwesomeIcon icon="search" />
);

export {
    HelpIcon,
    InfoIcon,
    EditIcon,
    ViewIcon,
    CloseIcon,
    SaveIcon,
    SaveDoneIcon,
    BackIcon,
    DownIcon,
    UpIcon,
    RightIcon,
    SearchIcon
};
