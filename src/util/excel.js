
class ExportExl {

    uri = 'data:application/vnd.ms-excel;base64,';
    template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>';
    base64 = s=>window.btoa(unescape(encodeURIComponent(s)));
    format = (s, c)=> s.replace(/{(\w+)}/g, (m, p)=>c[p]);

    getExl(name){
            const table = document.querySelectorAll('table')[0]
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}    
            window.location.href = this.getExl.uri + this.getExl.base64(this.getExl.format(this.getExl.template, ctx))  
    }
}

export default ExportExl

