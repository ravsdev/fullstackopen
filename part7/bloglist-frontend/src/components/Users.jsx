import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'
import { Table } from 'react-bootstrap'

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)

    useEffect(() => {
        ;(async () => {
            dispatch(initializeUsers())
            // console.log(userList)
        })()
    }, [])

    return (
        <div>
            <h2>Users</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>
                                    {user.name ?? user.username}
                                </Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Users
