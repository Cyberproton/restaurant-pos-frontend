import axios from './axios'

const hello = () => { 
    function handleClick() {
        axios.post('/', { helloMessage: 'Hello from React' })
        .then(response => alert(response.data.helloMessage), error => alert(error))
    }

    return (
        <button type="button" onClick={handleClick}>Post Hello World</button>
    )
}

export default hello