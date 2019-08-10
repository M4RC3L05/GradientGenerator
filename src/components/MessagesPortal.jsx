import ReactDOM from 'react-dom'

const root = document.querySelector('#messages')
export default props => {
    return ReactDOM.createPortal(props.children, root)
}
