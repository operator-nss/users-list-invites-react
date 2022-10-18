import React, {FC} from 'react';
import success from '../../assets/success.svg'

type SuccessProps = {
    count: number,
    completeInvite: () => void
}

const Success: FC<SuccessProps> = ({count, completeInvite}) => {
    return (
        <div className="success-block">
            <img src={success} alt="Success"/>
            <h3>Успешно!</h3>
            <p>{count > 1 ? 'Всем' : null} {count} {count > 1 ? 'пользователям' : 'пользователю'} отправлено
                приглашение.</p>
            <button onClick={completeInvite} className="send-invite-btn">Назад</button>
        </div>
    );
};

export default Success