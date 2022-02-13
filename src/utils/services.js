
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

// obtem o token de acesso
const getAcessToken = async () => {
    let formData = new FormData();
    formData.append("orgKey", `${process.env.REACT_APP_ORG_KEY}`);
    const options1 = {
        method: "POST",
        body: formData,
        headers: {
            Accept: "application/json",
        },
    };
    let responseToken = await fetch(`${process.env.REACT_APP_URL_DOCSTONE}/token`, options1);
    responseToken = await responseToken.json();
    const token = responseToken.tokenAccess;
    //console.log(token);
    return token;
}

const services = {
    getBase64,
    getAcessToken
}

export default services;