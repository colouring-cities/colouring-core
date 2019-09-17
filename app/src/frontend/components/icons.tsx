/**
 * Mini-library of icons
 */
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faPaintBrush, faInfoCircle, faTimes, faCheck, faCheckDouble,
    faAngleLeft, faCaretDown, faSearch, faEye } from '@fortawesome/free-solid-svg-icons'

library.add(
    faQuestionCircle,
    faInfoCircle,
    faPaintBrush,
    faTimes,
    faCheck,
    faCheckDouble,
    faAngleLeft,
    faCaretDown,
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
    SearchIcon
};
