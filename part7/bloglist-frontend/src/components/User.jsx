import { Badge, Card, ListGroup, Stack } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useParams } from 'react-router-dom'

const User = () => {
    const { id } = useParams()
    const users = useSelector((state) => state.users)
    const user = users.find((user) => user.id === id)

    if (!user) return null

    return (
        <Stack gap={3}>
            <h2>{user.name ?? user.username}</h2>
            <ListGroup>
                {user.blogs.length === 0
                    ? 'No blogs'
                    : user.blogs.map((blog) => (
                          <LinkContainer key={blog.id} to={`/blogs/${blog.id}`}>
                              <ListGroup.Item action>
                                  {blog.title}
                              </ListGroup.Item>
                          </LinkContainer>
                      ))}
            </ListGroup>
        </Stack>
    )
}

export default User
