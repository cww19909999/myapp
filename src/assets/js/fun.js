function formatTime(){
    let now = new Date();
    let y, M, d, h, m, s;
    y = now.getFullYear();
    M = now.getMonth() + 1;
    M = M < 10 ? '0' + M : M;
    d = now.getDate();
    d  = d < 10 ? '0' + d : d;
    h = now.getHours();
    h = h < 10 ? '0' + h : h;
    m = now.getMinutes();
    m = m < 10 ? '0' + m : m;
    s = now.getSeconds();
    s = s < 10 ? '0' + s : s;
    return `${y}-${M}-${d} ${h}:${m}:${s}`
}
export{ 
    formatTime 
};