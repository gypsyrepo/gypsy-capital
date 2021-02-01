export default () => {
    const gypsyData = localStorage.getItem('gypsy');
    if (!gypsyData) return null;
    let token = JSON.parse(gypsyData);
    token = token.token;
    return token;
}