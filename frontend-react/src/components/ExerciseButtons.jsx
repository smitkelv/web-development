import { IoTrashOutline } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';

export default function ExerciseButtons({ onDelete, onEdit }) {
    return (
        <>
            <IoTrashOutline onClick={onDelete} style={{ marginRight: '16px' }} />
            <MdEdit onClick={onEdit} />
        </>
    );
}