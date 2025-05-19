import { TableBody } from '@heroui/react'
import React from 'react'
import UserItem from './UserItem'
import type { User } from "../../store/interfaces/userInterfaces"

interface UserListProp {
    users: User[]
}

const UserList: React.FC<UserListProp> = ({ users }) => {
    return (
        <TableBody emptyContent={"No users found"}>
            {users.map((user) => (
                <UserItem key={user.id} user={user} />
            ))}
        </TableBody>
    )
}

export default UserList