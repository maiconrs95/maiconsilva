import React from "react"
import PropTypes from "prop-types"
import ReactDisqusComments from "react-disqus-comments"

/* Styled Components */
import { CommentsWrapper, CommentsTitle } from "./CommentsStyled"

const Comments = ({ url, title }) => {
    const completeURL = `https://maiconsilva.com${url}`

    return (
        <CommentsWrapper>
            <CommentsTitle>Comentários</CommentsTitle>
            <ReactDisqusComments
                shortname="maiconsilva"
                identifier={completeURL}
                title={title}
                url={completeURL}
            />
        </CommentsWrapper>
    )
}

Comments.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default Comments;
