/**
 * Mini-library of icons
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faAngleLeft,
    faAngleRight,
    faCaretDown,
    faCaretRight,
    faCaretUp,
    faCheck,
    faCheckCircle,
    faCheckDouble,
    faEye,
    faInfoCircle,
    faPaintBrush,
    faQuestionCircle,
    faSearch,
    faSpinner,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

library.add(
    faQuestionCircle,
    faInfoCircle,
    faPaintBrush,
    faTimes,
    faCheck,
    faCheckCircle,
    faCheckDouble,
    faAngleLeft,
    faAngleRight,
    faCaretDown,
    faCaretUp,
    faCaretRight,
    faSearch,
    faEye,
    faSpinner
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

const VerifyIcon = () => (
    <FontAwesomeIcon icon="check-circle" />
)

const BackIcon = () => (
    <FontAwesomeIcon icon="angle-left" />
);

const ForwardIcon = () => (
    <FontAwesomeIcon icon="angle-right" />
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

const SpinnerIcon: React.FC<{spin?: boolean}> = ({spin=true}) => (
    <FontAwesomeIcon icon="spinner" spin={spin} />
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
    ForwardIcon,
    DownIcon,
    UpIcon,
    RightIcon,
    SearchIcon,
    VerifyIcon,
    SpinnerIcon
};
