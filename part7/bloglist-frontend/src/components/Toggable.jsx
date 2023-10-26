/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Stack } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button
                    variant="primary"
                    id="new-blog"
                    onClick={toggleVisibility}
                >
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                <Stack gap={2} className="col-md-5 mx-auto">
                    {props.children}
                    <Button variant="secondary" onClick={toggleVisibility}>
                        Cancel
                    </Button>
                </Stack>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
