// Servicio de paginación
getSlicePagination = (arrayRecords, pageFactor, pageNumber = 1) => {
    let recordSlice = [];

    if(pageFactor < 1 || arrayRecords.length == 0) return;  
    let slices = Math.floor(arrayRecords.length / pageFactor);  
    let arrayRecordsLength = arrayRecords.length
    if(pageNumber > slices) return; 

    if(pageNumber == slices) {
        if(arrayRecordsLength % pageFactor != 0) {          
            recordSlice = arrayRecords.slice(slices * pageFactor, (slices * pageFactor) + (arrayRecordsLength % pageFactor));
        } else {            
            recordSlice = arrayRecords.slice((pageNumber - 1) * pageFactor, pageNumber * pageFactor);
        }
    } else if(pageNumber < slices) {
            if(arrayRecordsLength % pageFactor != 0) {
                recordSlice = arrayRecords.slice(pageNumber * pageFactor, (pageNumber + 1) * pageFactor);
            } else {
                recordSlice = arrayRecords.slice((pageNumber - 1) * pageFactor, pageNumber * pageFactor);           
            }           
    }   
    return recordSlice;
}

/*
Probado con 

getSlicePagination(p, 10, 100);
getSlicePagination(s, 10, 99);
*/

module.exports = {
    getSlicePagination
}