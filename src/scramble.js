function scramble(str)
{
    let charList = str.split('');
    // console.log(charList);

    for(let i = charList.length - 2; i > 1; i--)
    {
        let swap = Math.floor(Math.random() * (charList.length - 2 - 1) +1);
        let temp = charList[i];
        charList[i] = charList[swap];
        charList[swap] = temp;
        
    }

    return charList.join('');

}

export default scramble;