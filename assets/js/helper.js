//Global functions - kan bruges overalt

export const myFetch = async (url) => {
    try{
        const resonse = await fetch(url);
        const result = await resonse.json();
        return result;
    }
    catch(err){
        console.error(`myFetch Error: ${err}`);
    }
}