
    function getCookie(name){
        const value=";"+document.cookie;
        const parts=value.split(";"+name+"=");
        if(parts.length===2)
            return parts.pop().split(";").shift();
    }
    const token=getCookie('token');
    if(token){
         document.getElementById('lstt').style.display='none';
        document.getElementById('lsts').style.display='none';
        document.getElementById('lst').style.display='block';
        document.getElementById('addStudent').style.display='block';
    }
    else{
           document.getElementById('lst').style.display='none';
           document.getElementById('lstt').style.display='block';
           document.getElementById('lsts').style.display='block';
           document.getElementById('addStudent').style.display='none';
    }
