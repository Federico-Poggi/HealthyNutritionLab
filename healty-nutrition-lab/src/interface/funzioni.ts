export function useDownload(){

    const download= (fileBase64: string)=>{
        const byteChar=atob(fileBase64);
        const byteNumber=new Array(byteChar.length);
        for(let i=0; i<byteChar.length;i++){
            byteNumber[i]=byteChar.charCodeAt(i);
        }

        const byteArr=new Uint8Array(byteNumber);
        const BLOB=new Blob([byteArr],{type:'application/octet-stream'});
        const url=URL.createObjectURL(BLOB);

        const a=document.createElement('a');
        a.href=url;
        a.download='New-Diete.pdf';
        document.body.appendChild(a);

        a.click();

        URL.revokeObjectURL(url);

        document.body.removeChild(a);
    }

    return(
        download
    )
}