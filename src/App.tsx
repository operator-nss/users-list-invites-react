import React, {useEffect, useRef, useState} from 'react'
import Users from '../src/components/Users/Users'
import Success from "./components/Success/Success";

function App() {
    const isMounted = useRef(false);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [sendInvite, setSendInvite] = useState(false);

    useEffect(() => {
        if (!isMounted.current) {
            fetch('https://reqres.in/api/users')
                .then(data => data.json())
                .then(res => setUsers(res.data))
                .catch(e => console.log(e))
            isMounted.current = true;
        }
    }, [])

    const selectUser = (id: any) => {
        if (selectedUsers.includes(id)) {
            const res = selectedUsers.filter(num => num !== id)
            setSelectedUsers(res)
        } else {
            setSelectedUsers([...selectedUsers, id])
        }
    }

    const completeInvite = () => {
        setSendInvite(!sendInvite)
    }

    const resetInvite = () => {
        setSendInvite(!sendInvite)
        setSelectedUsers([])
    }

    return (
        <div className="App">
            {sendInvite ?
                <Success completeInvite={resetInvite} count={selectedUsers.length}/>
                :
                <Users completeInvite={completeInvite} selectUser={selectUser} selectedUsers={selectedUsers}
                       items={users} isLoading={isMounted.current}/>}
        </div>
    )
}

export default App
