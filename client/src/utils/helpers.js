export const tryParseJSON = (content) => {
  try {
    if (typeof content === 'string') {
      return JSON.parse(content);
    }
    return content || { type: 'doc', content: [] };
  } catch {
    return { type: 'doc', content: [] };
  }
};
export const getDateDif = (old_date) =>{
  const postDate = new Date(old_date)
  const now = new Date();
  const milliDiff = now - postDate;
  const hoursDif = milliDiff/(1000*60*60)
  if(Math.floor(hoursDif)===0) return 'few minutes ago'
  else if(Math.floor(hoursDif)>=24) return `${postDate.toLocaleDateString()}`
  else return (Math.floor(hoursDif) + ' hours ago')
}