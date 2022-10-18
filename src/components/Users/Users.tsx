import React, {FC, useRef, useState} from 'react';
import {Skeleton} from '../Skeleton/Skeleton';
import User, {user} from '../User/User';

type UsersProps = {
    items: user[],
    isLoading: boolean,
    selectUser: (params: any) => any,
    selectedUsers: number[],
    completeInvite: () => void
}

const Users: FC<UsersProps> = ({items, selectedUsers, completeInvite, isLoading, selectUser}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value.toLowerCase());
    }

    return (
        <>
            <div className="search">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                </svg>
                <input onChange={onChangeInput} ref={inputRef} value={value} type="text"
                       placeholder="Найти пользователя..."/>
            </div>
            {!isLoading ? (
                <div className="skeleton-list">
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
            ) : (
                <ul className="users-list">
                    {items?.filter(user => {
                        const fullName = user.first_name.toLowerCase() + user.last_name.toLowerCase();
                        return fullName.includes(value)
                    })
                        .map((item: user) => {
                            return <User key={item.id} id={item.id} email={item.email}
                                         selected={selectedUsers.includes(item.id)} first_name={item.first_name}
                                         last_name={item.last_name} selectUser={selectUser} avatar={item.avatar}/>
                        })}
                </ul>
            )}
            {selectedUsers.length ?
                <button onClick={completeInvite} className="send-invite-btn">Отправить приглашение</button> : null}
        </>
    );
};

export default Users;