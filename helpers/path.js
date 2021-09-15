

const urlPropio = () =>{
    return (window.location.hostname.includes('localhost'))
              ? 'http://localhost:8088/api/auth/'
              :'https://mi-primer-restserver.herokuapp.com/api/auth/';  
}


module.exports = {
    urlPropio
}